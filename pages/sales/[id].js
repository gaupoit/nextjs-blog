import Head from "next/head";
import Image from "next/image";
import Layout from "../../components/layout";
import Parse from "../../services/parse";

export default function Sale({ saleData }) {
  const { name, images, price } = saleData;
  return (
    <Layout>
      <Head>
        <title>{name}</title>
        <meta name="description" content={name} />
        {/* <meta property="og:url" content={currentURL} key="ogurl" /> */}
        <meta property="og:image" content={images[0]} key="ogimage" />
        <meta property="og:site_name" content="Chợ VieFAM" key="ogsitename" />
        <meta property="og:title" content={name} key="ogtitle" />
        <meta
          property="og:description"
          content={`Bài bán ${name}`}
          key="ogdesc"
        />
      </Head>
      <article>
        <div>
          <label>Cây: </label>
          <span>{name}</span>
        </div>
        <div>
          <label>Giá: </label>
          <span>{price}</span>
        </div>
        <div>
          <Image src={images[0]} width="775" height="669" />
        </div>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const query = new Parse.Query("SaleItem");
  const sales = await query.findAll();

  const paths = sales.map((sale) => ({
    params: {
      id: sale.id,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const query = new Parse.Query("SaleItem");
  try {
    const saleItem = await query.get(params.id);
    if (!saleItem) {
      return { notFound: true };
    }
    const saleData = {
      name: saleItem.get("name"),
      images: saleItem.get("images"),
      price: saleItem.get("price"),
    };

    console.log("Sale Data", saleData);
    return {
      props: {
        saleData,
      },
    };
  } catch (error) {
    console.error("Failed to get sale item because", error);
    return {
      notFound: true,
    };
  }
}
