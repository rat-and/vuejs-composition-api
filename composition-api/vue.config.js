module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/composition-api-demo"
      : "/",
};
