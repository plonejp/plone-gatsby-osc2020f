import React from "react"
// import { Link } from "gatsby"

// import { Layout } from "../templates/Layout";
// import { Button } from "@material-ui/core";

import { graphql } from 'gatsby';

import Layout from '../templates/Layout';
import Document from '../components/Document';
import Folder from '../components/Folder';

const nodes = query => (query ? query['edges'] : []).map(edge => edge.node);



// const IndexPage = () => (
//   <Layout>
//     <Button variant="contained" color="primary">
//       Hello World!
//     </Button>
//   </Layout>
// )

const IndexPage = ({ data }) => (
  <Layout>
    <Document
      data={data.ploneDocument}
      images={nodes(data['allPloneImage'])}
      files={nodes(data['allPloneFile'])}
    />
    <hr style={{ background: '#e8eef2' }} />
    <Folder
      data={data.ploneSite}
      title="Contents"
      images={nodes(data['allSitePloneImage'])}
      files={nodes(data['allSitePloneFile'])}
    />
  </Layout>
);

export default IndexPage;


export const query = graphql`
  query IndexPageQuery {
    ploneDocument(_path: { in: ["/frontpage/", "/front-page/"] }) {
      ...Document
    }
    allPloneFile(
      filter: { _backlinks: { in: ["/frontpage/", "/front-page/"] } }
    ) {
      edges {
        node {
          ...File
        }
      }
    }
    allPloneImage(
      filter: { _backlinks: { in: ["/frontpage/", "/front-page/"] } }
    ) {
      edges {
        node {
          ...Image
        }
      }
    }
    ploneSite(_path: { eq: "/" }) {
      ...Site
    }
    allSitePloneFile: allPloneFile(filter: { _backlinks: { eq: "/" } }) {
      edges {
        node {
          ...File
        }
      }
    }
    allSitePloneImage: allPloneImage(filter: { _backlinks: { eq: "/" } }) {
      edges {
        node {
          ...Image
        }
      }
    }
  }
`;
