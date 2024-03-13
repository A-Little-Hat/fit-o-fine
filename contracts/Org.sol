// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Org {
    struct Organization {
        address id;
        string name;
        string addr;
        string email;
        string con;
        string typ;
        string role;
        bool verified;
    }
    struct OrgMap {
        address[] keys;
        mapping(address => Organization) values;
        mapping(address => uint256) indexOf;
        mapping(address => bool) inserted;
    }
    OrgMap private orgmap;
    function OrgMapSet(address key, Organization memory val) private {
        if (orgmap.inserted[key]) {
            orgmap.values[key] = val;
        } else {
            orgmap.inserted[key] = true;
            orgmap.values[key] = val;
            orgmap.indexOf[key] = orgmap.keys.length;
            orgmap.keys.push(key);
        }
    }
    address admin;
    struct Patient {
        string orgname;
        string pid;
        string patient_name;
        string addr;
        uint256 age;
        uint256 mobno;
        string email;
        uint256 report_date;
        string test_name;
        string description;
    }

    Patient[] public patients;
    event AddPatient(Patient _patient);

    function addPatient(
        string memory orgname,
        string memory pid,
        string memory patient_name,
        string memory addr,
        uint256 age,
        uint256 mobno,
        string memory email,
        uint256 report_date,
        string memory test_name,
        string memory description
    ) public {
        require(msg.sender != admin, "Only Organizations can add new patients");
        patients.push(
            Patient({
                orgname: orgname,
                pid: pid,
                patient_name: patient_name,
                addr: addr,
                age: age,
                mobno: mobno,
                email: email,
                report_date: report_date,
                test_name: test_name,
                description: description
            })
        );
        emit AddPatient(patients[patients.length - 1]);
    }

    constructor(
        string memory name,
        string memory addr,
        string memory email,
        string memory con,
        string memory typ
    ) {
        admin = msg.sender;
        Organization memory org = Organization(
            admin,
            name,
            addr,
            email,
            con,
            typ,
            "admin",
            true
        );
        OrgMapSet(admin, org);
    }
    event Register(Organization _org);
    function register(
        string memory name,
        string memory addr,
        string memory email,
        string memory con,
        string memory typ
    ) public {
        address sender = msg.sender;
        // TODO: check that a user is already exist or not
        Organization memory org = Organization(
            sender,
            name,
            addr,
            email,
            con,
            typ,
            "user",
            false
        );
        OrgMapSet(sender, org);
        emit Register(org);
    }
    function getOrg() public view returns (Organization memory) {
        return orgmap.values[msg.sender];
    }
    function getUnverifiedOrganization()
        public
        view
        returns (Organization[] memory)
    {
        uint256 counter = 0;

        for (uint256 i = 0; i < orgmap.keys.length; i++) {
            Organization memory item = orgmap.values[orgmap.keys[i]];
            if (!item.verified) counter++;
        }

        Organization[] memory orgs = new Organization[](counter);
        uint256 j = 0;
        for (uint256 i = 0; i < orgmap.keys.length; i++) {
            Organization memory item = orgmap.values[orgmap.keys[i]];
            if (!item.verified) {
                orgs[j] = item;
                j++;
            }
        }
        return orgs;
    }

    event VerifyOrganization(string _message);

    function verifyOrganization(address _address) public {
        require(msg.sender == admin, "Only admin can verify Organization");
        Organization storage org = orgmap.values[_address];
        org.verified = true;
        emit VerifyOrganization("Organization update success");
    }
    function rejectOrganization(address _address) public {
        require(msg.sender == admin, "Only admin can reject Organization");
        // You can add any additional logic here before rejecting the organization
        delete orgmap.values[_address]; // Delete the organization from the mapping
        emit VerifyOrganization("Organization rejected");
    }

    function getVerifiedOrganization()
        public
        view
        returns (Organization[] memory)
    {
        // TODO: Create a pagination type data return
        // INFO: Resolve null value from the voters
        uint256 counter = 0;

        for (uint256 i = 0; i < orgmap.keys.length; i++) {
            Organization memory item = orgmap.values[orgmap.keys[i]];
            if (item.verified) counter++;
        }

        Organization[] memory orgs = new Organization[](counter);
        uint256 j = 0;
        for (uint256 i = 0; i < orgmap.keys.length; i++) {
            Organization memory item = orgmap.values[orgmap.keys[i]];
            if (item.verified) {
                orgs[j] = item;
                j++;
            }
        }
        return orgs;
    }

    function getPatients() public view returns (Patient[] memory) {
        return patients;
    }
}
