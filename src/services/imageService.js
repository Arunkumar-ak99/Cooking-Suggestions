export const getIngredientImage = async (name) => {

  try {
    const params = new URLSearchParams({
      action: "query",
      generator: "search",
      gsrsearch: `${name} food`,
      gsrnamespace: "6",
      gsrlimit: "5",
      prop: "imageinfo",
      iiprop: "url",
      iiurlwidth: "300",
      format: "json",
      origin: "*"
    });

    const response = await fetch(
      `https://commons.wikimedia.org/w/api.php?${params}`
    );

    const data = await response.json();

    const pages = Object.values(data.query?.pages || {});

    return pages[0]?.imageinfo?.[0]?.thumburl || "";

  } catch (error) {
    console.log(error);
    return "";
  }
};