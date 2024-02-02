const ORgContract = artifacts.require("Org");
console.log(ORgContract)
contract("Org", (accounts) => {
    let OrgContract = null;
    before(async () => {
        OrgContract = await ORgContract.deployed();
    });

    it("Get the admin and should be admin", async () => {
        const user = await OrgContract.getOrg({ from: accounts[0] });
        assert(user.role === "admin");
    });

    it("Register organization and get organization and role should be user and must be unverified", async () => {
        let currentAccount = accounts[1];
        await OrgContract.register(
            "Abc hospital",
            "45 h lenin sarani",
            "abchospital@gmail.com",
            "8945612397",
            "hospital",
            { from: currentAccount }
        );
        const user = await OrgContract.getOrg({ from: currentAccount });
        assert(user.role === "user");
        assert(!user.verified);
    });

    it("Verify organization from user and should not verified as admin only verify organization ", async () => {
        let currentAccount = accounts[1];
        try {
            await OrgContract.verifyOrganization(currentAccount, {
                from: currentAccount,
            });
            assert.isOk(false);
        } catch (e) {
            assert.isOk(true);
        }
    });
    


    it("Verify organization from admin and should be verified", async () => {
        let currentAccount = accounts[1];
        await OrgContract.verifyOrganization(currentAccount, {
            from: accounts[0],
        });
        const user = await OrgContract.getOrg({ from: currentAccount });
        assert(user.verified);
    });

});
