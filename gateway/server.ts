import app from ".";

const PORT = process.env.PORT || 6969;


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
