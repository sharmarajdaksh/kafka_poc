
const { Kafka } = require("kafkajs");

const msg = process.argv[2];

const run = async () => {
    try {
        const kafka = new Kafka({
            clientId: "nodejsclient",
            brokers: ["localhost:9092"],
        });

        const producer = kafka.producer();
        await producer.connect();

        const partition = msg[0] < "N" ? 0 : 1;
        const result = await producer.send({
            topic: "users",
            messages: [
                {
                    value: msg,
                    partition: partition
                }
            ]
        });

        console.log(result);

        producer.disconnect();
    }
    catch (e) {
        console.error(e);
    }
    finally {
        process.exit(0);
    }
};

run();