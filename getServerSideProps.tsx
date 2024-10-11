export async function getServerSideProps(context: any) {
    let res = await fetch("http://localhost:3000/api/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let allPosts = await res.json();
  
    return {
      props: { allPosts },
    };
  }