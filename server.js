const app = require('./app')
const mongoose = require('mongoose');
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');

const db_str = 'projects/88480249468/secrets/dealsdummy_db/versions/1';
const client = new SecretManagerServiceClient();

async function accessSecretAndConnectDB() {
    const [version] = await client.accessSecretVersion({
        name: db_str,
    });
  const  payload = version.payload.data.toString();
    mongoose.connect(payload, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then((con => {
        console.log('DB connection successful');
    }));
}

accessSecretAndConnectDB();


app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`);
});
