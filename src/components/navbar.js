import React from 'react';
import { Link } from 'gatsby';
import { StaticQuery, graphql } from 'gatsby';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

function SearchAppBar(data, active) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const skip = ['/']
        .concat(data.allPloneFile.edges.map(edge => edge.node._path))
        .concat(data.allPloneImage.edges.map(edge => edge.node._path));
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h5" noWrap>
                        {data.site.siteMetadata.title}
                    </Typography>
                    <Tabs value={value} onChange={handleChange} aria-label="Global menu">
                        {data.ploneNavigation.items
                            .filter(item => !skip.includes(item._path))
                            .map(item => (
                                <LinkTab label={item.title} key={item._id} href={item._path} className={
                                    item._path === active ||
                                        (active || '').startsWith(item._path)
                                        ? 'navbar-item active'
                                        : 'navbar-item'
                                } />

                            ))}
                    </Tabs>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}



const NavBar = ({ active }) => (
    <StaticQuery
        query={graphql`
      query NavbarQuery {
        ploneNavigation(_path: { eq: "/" }) {
          items {
            _id
            _path
            title
          }
        }
        allPloneFile(filter: { _backlinks: { eq: "/" } }) {
          edges {
            node {
              _path
            }
          }
        }
        allPloneImage(filter: { _backlinks: { eq: "/" } }) {
          edges {
            node {
              _path
            }
          }
        }

        site {
            siteMetadata {
              title
            }
          }

      }
    `}
        render={data => {
            return (
                SearchAppBar(data, active)
                //     <nav className="navbar">
                //         <div className="navbar-container">
                //             <Link to="/" className="navbar-brand">
                //                 Gatsby Starter Plone
                // </Link>
                //             <ol className="navbar-menu">
                //                 <li className="navbar-item">
                //                     <Link to="/">Home</Link>
                //                 </li>
                //                 {data.ploneNavigation.items
                //                     .filter(item => !skip.includes(item._path))
                //                     .map(item => (
                //                         <li
                //                             key={item._id}
                //                             className={
                //                                 item._path === active ||
                //                                     (active || '').startsWith(item._path)
                //                                     ? 'navbar-item active'
                //                                     : 'navbar-item'
                //                             }
                //                         >
                //                             <Link to={item._path}>{item.title}</Link>
                //                         </li>
                //                     ))}
                //             </ol>
                //         </div>
                //     </nav>
            );
        }}
    />
);

export default NavBar;
