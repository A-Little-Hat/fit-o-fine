module.exports = {
    contracts_build_directory: "./client/src/artifact",
    networks: {
        development: {
            ///from: "0x8EEAa3B74Cfa8FbfB1bCdB37935072cA8b7D5695", // Defaults to first address from Ganache
            host: "127.0.0.1",
            port: 7545,
            network_id: "*",
        },
    },
    mocha: {},
    compilers: {
        solc: {
            version: "0.8.10",
        },
    },
};