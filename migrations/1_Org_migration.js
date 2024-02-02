const Organization = artifacts.require("Org");

module.exports = function (deployer) {
    deployer.deploy(
        Organization,
        "HealthLab PVT LTD",
        "2/3 XYZ Road",
        "ahealthlab87@gmail.com",
        "9874631599",
        "HealthCare Agency"
    );
};
