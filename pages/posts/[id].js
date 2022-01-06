import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import Parse from "../../services/parse";
import Image from "next/image";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className="text-3xl font-bold underline">VieFAM Post</h1>
        <Image src={postData.title} width={300} height={300} />
        {/* <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
        <div>
          <a href="">Open in app</a>
        </div>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const query = new Parse.Query("Post");
  const posts = await query.findAll();

  const paths = posts.map((p) => ({
    params: {
      id: p.id,
    },
  }));
  return {
    paths,
    fallback: true, // explain later
  };
}

export async function getStaticProps({ params }) {
  const query = new Parse.Query("Post");
  const post = await query.get(params.id);
  const postData = {
    title: post.get("images")[0],
  };
  return {
    props: {
      postData,
    },
  };
}
