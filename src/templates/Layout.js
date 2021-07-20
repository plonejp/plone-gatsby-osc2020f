import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Header from "../components/header"
import Breadcrumbs from '../components/breadcrumbs';
import NavBar from '../components/navbar';
import './Layout.css';


const theme = createMuiTheme({
    //テーマの定義
});

const Layout = ({ breadcrumbs, children, data }) => (
    <ThemeProvider theme={theme}>
        <StaticQuery
            query={graphql`
          query siteTitleQuery {
            site {
              siteMetadata {
                title
                subTitle
              }
            }
          }
        `}
            render={data => {
                const node = children.length
                    ? children[0].props.data
                    : children.props.data;
                const active = node
                    ? node._path === '/frontpage/'
                        ? '/'
                        : node._path
                    : null;
                return (
                    <>
                        <Helmet
                            title={data.site.siteMetadata.title}
                            meta={[
                                { name: 'description', content: 'Gatsby Starter Plone' },
                                { name: 'keywords', content: 'gatsby, plone' },
                            ]}
                        />
                        <NavBar active={active} />
                        <Header siteData={data.site.siteMetadata} />
                        {breadcrumbs && <Breadcrumbs data={breadcrumbs} />}
                        <div
                            style={{
                                margin: '0 auto',
                                maxWidth: 960,
                                padding: '0px 1.0875rem 1.45rem',
                                paddingTop: 0,
                                marginTop: '2em',
                            }}
                        >
                            {children}
                        </div>
                    </>
                );
            }}
        /></ThemeProvider>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
