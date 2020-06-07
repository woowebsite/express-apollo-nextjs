import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withApollo } from "../apollo/apollo";
import MainLayout from "../layouts/Main";

const QUERY = gql`
  query {
    getCompany(where: { id: 1 }) {
      id
      name
    }
  }
`;

const NOSSR = () => {
  const { data, loading, error, refetch } = useQuery(QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <MainLayout>
      <h1>This should be rendered on client side</h1>
      <pre>Data: {data.getCompany.name}</pre>
      <button onClick={() => refetch()}>Refetch</button>
    </MainLayout>
  );
};

export default withApollo({ ssr: false })(NOSSR);
