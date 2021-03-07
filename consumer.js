
const { Kafka } = require("kafkajs");

const run = async () => {
    try {
        const kafka = new Kafka({
            clientId: "nodejsclient",
            brokers: ["localhost:9092"],
        });

        const consumer = kafka.consumer({
            groupId: "test"
        });
        await consumer.connect();

        consumer.subscribe({
            topic: "users",
            fromBeginning: true
        });

        await consumer.run({
            eachMessage: async result => {
                console.log(`Received ${result.message.value} on ${result.partition}`);
            }
        })
    }
    catch (e) {
        console.error(e);
    }
};

run();