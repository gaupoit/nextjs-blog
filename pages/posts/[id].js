import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import Parse from "../../services/parse";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Post({ postData }) {
  const { isFallback } = useRouter();

  if (isFallback) return <h1>Loading</h1>;
  return (
    <Layout>
      <Head>
        <title>Deeplink</title>
      </Head>
      <article>
        <h1 className="text-3xl font-bold underline">
          Testing Deeplink's Post
        </h1>
        {postData.title && (
          <Image src={postData.title} width={300} height={300} />
        )}
        {/* <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
        <div>
          <a href="https://links.viefam.com/D2mSAd4HRiLB85gF7">Open in app</a>
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
  try {
    const post = await query.get(params.id);
    if (!post) {
      return { notFound: true };
    }
    const postData = {
      title: post ? post.get("images")[0] : "Not found",
    };
    return {
      props: {
        postData,
      },
    };
  } catch (error) {
    console.log("Post", error);
    return {
      notFound: true,
    };
  }
}
