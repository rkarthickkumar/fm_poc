import Head from "next/head";
import React from "react";

const Banner = (await import("admin/Banner")).default;

console.log("component", Banner);
export default function Home() {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <div className="container" style={{ padding: "10px" }}>
      <Head>
        <title> Consumer App </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div> Consumer Banner here</div>
      {loaded ? (
        <React.Suspense fallback="loading">
          <Banner />
        </React.Suspense>
      ) : null}
      {/* <iframe
        src="http://localhost:3000"
        width="1280px"
        height="768px"
        style={{ border: "none" }}
      ></iframe> */}
    </div>
  );
}
