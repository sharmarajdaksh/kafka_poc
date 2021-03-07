const { Kafka } = require("kafkajs");

const run = async () => {
    try {
        const kafka = new Kafka({
            clientId: "nodejsclient",
            brokers: ["localhost:9092"],
        });

        const admin = kafka.admin();
        await admin.connect();

        await admin.createTopics({
            topics: [
                {
                    topic: "users",
                    numPartitions: 2
                }]
        });

        admin.disconnect();
    }
    catch (e) {
        console.error(e);
    }
    finally {
        process.exit(0);
    }
};

run();