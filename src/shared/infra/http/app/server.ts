import { app } from '.';

app.listen(process.env.SERVER_PORT, () => {
  console.log(`🚀Server is running on port ${process.env.SERVER_PORT}`);
});
