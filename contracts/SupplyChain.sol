// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SupplyChain {

    // =========================
    // STRUCTURES
    // =========================

    struct Product {
        uint256 id;
        string name;
        string location;
        string status;
        uint256 timestamp;
        address createdBy;
        bool exists;
    }

    struct Tracking {
        string location;
        string status;
        uint256 timestamp;
        address updatedBy;
    }

    // =========================
    // STATE VARIABLES
    // =========================

    address public owner;

    uint256 public productCount;

    mapping(address => bool) public manufacturers;
    mapping(address => bool) public distributors;

    mapping(uint256 => Product) public products;

    mapping(uint256 => Tracking[]) public trackingHistory;

    // =========================
    // EVENTS
    // =========================

    event ManufacturerAdded(address manufacturer);

    event DistributorAdded(address distributor);

    event ProductAdded(
        uint256 productId,
        string name,
        string location,
        string status
    );

    event ProductUpdated(
        uint256 productId,
        string location,
        string status
    );

    // =========================
    // CONSTRUCTOR
    // =========================

    constructor() {
        owner = msg.sender;

        manufacturers[msg.sender] = true;
    }

    // =========================
    // MODIFIERS
    // =========================

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only owner can perform this action"
        );
        _;
    }

    modifier onlyManufacturer() {
        require(
            manufacturers[msg.sender],
            "Only manufacturer can perform this action"
        );
        _;
    }

    modifier onlyDistributor() {
        require(
            distributors[msg.sender],
            "Only distributor can perform this action"
        );
        _;
    }

    modifier onlyManufacturerOrDistributor() {
        require(
            manufacturers[msg.sender] ||
            distributors[msg.sender],
            "Not authorized"
        );
        _;
    }

    // =========================
    // ADD MANUFACTURER
    // =========================

    function addManufacturer(
        address _manufacturer
    ) public onlyOwner {

        manufacturers[_manufacturer] = true;

        emit ManufacturerAdded(_manufacturer);
    }

    // =========================
    // ADD DISTRIBUTOR
    // =========================

    function addDistributor(
        address _distributor
    ) public onlyOwner {

        distributors[_distributor] = true;

        emit DistributorAdded(_distributor);
    }

    // =========================
    // ADD PRODUCT
    // =========================

    function addProduct(
        string memory _name,
        string memory _location,
        string memory _status
    ) public onlyManufacturer {

        productCount++;

        products[productCount] = Product(
            productCount,
            _name,
            _location,
            _status,
            block.timestamp,
            msg.sender,
            true
        );

        trackingHistory[productCount].push(
            Tracking(
                _location,
                _status,
                block.timestamp,
                msg.sender
            )
        );

        emit ProductAdded(
            productCount,
            _name,
            _location,
            _status
        );
    }

    // =========================
    // UPDATE PRODUCT
    // =========================

    function updateProduct(
        uint256 _id,
        string memory _location,
        string memory _status
    ) public onlyManufacturerOrDistributor {

        require(
            products[_id].exists,
            "Product does not exist"
        );

        products[_id].location = _location;
        products[_id].status = _status;

        products[_id].timestamp = block.timestamp;

        trackingHistory[_id].push(
            Tracking(
                _location,
                _status,
                block.timestamp,
                msg.sender
            )
        );

        emit ProductUpdated(
            _id,
            _location,
            _status
        );
    }

    // =========================
    // GET TRACKING HISTORY
    // =========================

    function getTrackingHistory(
        uint256 _id
    )
        public
        view
        returns (Tracking[] memory)
    {
        require(
            products[_id].exists,
            "Product does not exist"
        );

        return trackingHistory[_id];
    }

    // =========================
    // VERIFY PRODUCT
    // =========================

    function verifyProduct(
        uint256 _id
    )
        public
        view
        returns (
            bool exists,
            string memory name,
            string memory location,
            string memory status,
            uint256 timestamp,
            address createdBy
        )
    {
        Product memory product = products[_id];

        return (
            product.exists,
            product.name,
            product.location,
            product.status,
            product.timestamp,
            product.createdBy
        );
    }
}