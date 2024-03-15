
## Smart Contract

```
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Org{
    address admin;          //Admin Addresss

    // Structure of the Organization to store details of the organization
    struct Organization{
        address id;
        string name;
        string addr;
        string email;
        string con;
        string typ;
        string role;
        bool verified;
    }

    // Structure of the Patient to store details of the Patient
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

    // This struct is used to map addresses to Organization structs. It contains arrays and mappings to efficiently store and retrieve organizations.
    struct OrgMap {
        address[] keys;
        mapping(address => Organization) values;  // this mapping stores all the org details

        mapping(address => uint256) indexOf;    // This mapping is used to store the index of an address in the keys array.
                                                // The key of this mapping is an address, and the value is the index of that address in the keys array.
                                                // It helps in quickly finding the index of an address in the keys array without iterating through the entire array.

        mapping(address => bool) inserted;  //The key of this mapping is an address, and the value is a boolean indicating whether the address has been inserted (true) or not (false).
                                            // It helps in checking whether an address already exists in the keys array before attempting to insert it.
    }
    
    OrgMap private orgmap; 

    function OrgMapSet(address key, Organization memory val) private {
    // The function first checks whether the key exists in the inserted mapping of the orgmap struct.
    // If the key exists (orgmap.inserted[key] evaluates to true), it means the key is already in use, so the function updates the value associated with that key in the values mapping to the provided val.
    // 
    // If the key doesn't exist (orgmap.inserted[key] evaluates to false), it means the key is being used for the first time.
    // In this case, the function:
    //              Sets orgmap.inserted[key] to true, indicating that the key has been inserted.
    //              Sets orgmap.values[key] to the provided val, storing the organization struct associated with the key.
    //              Sets orgmap.indexOf[key] to the current length of the keys array, which effectively records the index of this new key in the array.
    //              Pushes the key to the end of the keys array.
        if (orgmap.inserted[key]) {
            orgmap.values[key] = val;
        } else {
            orgmap.inserted[key] = true;
            orgmap.values[key] = val;
            orgmap.indexOf[key] = orgmap.keys.length;
            orgmap.keys.push(key);
        }
    }

    // Constructor function.  It is called while deploying the contract. It stores details of the admin.
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
            "admin",        // the deployer is the admin of the system.
            true            // THis account is verified. no need to verify it.
        );
        OrgMapSet(admin, org);
    }

    event Register(Organization _org);
    // Register function. It is called while a new organization is trying to join the network.
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
            "user", //role is set to user i.e. this is an user of the medical system i.e. a hospital or a test lab
            false   // This boolean value denotes the status of the 
        );
        OrgMapSet(sender, org);
        emit Register(org);
    }

    Patient[] public patients;          // patient array

    event AddPatient(Patient _patient);

    function addPatient(
        // Allows organizations (except the admin) to add patient records to the system.
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
                orgname:orgname,
                pid:pid,
                patient_name: patient_name,
                addr:addr,
                age:age,
                mobno:mobno,
                email:email,
                report_date:report_date,
                test_name:test_name,
                description: description
            })
        );
        emit AddPatient(patients[patients.length - 1]);
    }

    
    // this function retrieves the organization details of a perticular org.
     function getOrg() public view returns (Organization memory) {
        return orgmap.values[msg.sender];
    }

    // Retrieves unverified organizations. this returns the orgs that are just requested to the admin to register themselves but yet to be verified.
    function getUnverifiedOrganization() public view returns (Organization[] memory) {
       
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
    // Allows the admin to verify organizations. Request will come to this function with the affress of the org. then it checks the value in the orgmap and found 
    function verifyOrganization(address _address) public {
        require(msg.sender == admin, "Only admin can verify Organization");
        Organization storage org = orgmap.values[_address];     //fetching the details from that address
        org.verified = true;                                    // setting the value of verified field of respective orgs
        emit VerifyOrganization("Organization update success");
    }
    // rejectOrganization function is used to delete the organization from the mapping.
    function rejectOrganization(address _address) public {
        require(msg.sender == admin, "Only admin can reject Organization");
        delete orgmap.values[_address]; // Delete the organization from the mapping
        emit VerifyOrganization("Organization rejected");
    }

    // Retrieves verified organizations. It means only the organizations with admin approval are to be returned.
    function getVerifiedOrganization() public view returns (Organization[] memory) {
        uint256 counter = 0;

        // counts the no of verified orgs
        for (uint256 i = 0; i < orgmap.keys.length; i++) {
            Organization memory item = orgmap.values[orgmap.keys[i]];
            if (item.verified) counter++;
        }

        Organization[] memory orgs = new Organization[](counter); //  temp variable to store  verified orgs
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

    // returns the patients from the block
    function getPatients() public view returns (Patient[] memory) {
        return patients;
    }
}

```

## Authors

- [@A-Little-Hat](https://github.com/A-Little-Hat)

