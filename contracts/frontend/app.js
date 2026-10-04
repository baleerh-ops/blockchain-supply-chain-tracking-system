// ============================================================
// BLOCKCHAIN SUPPLY CHAIN TRACKING SYSTEM
// app.js
// ============================================================


// ============================================================
// 1. CONTRACT CONFIGURATION
// ============================================================

const contractAddress =
    "0xb7f8bc63bbcad18155201308c8f3540b07f84f5e";

const contractABI = [

    // ---------------- OWNER ----------------

    "function owner() view returns (address)",

    // ---------------- ROLES ----------------

    "function manufacturers(address) view returns (bool)",
    "function distributors(address) view returns (bool)",

    "function addManufacturer(address _manufacturer)",
    "function addDistributor(address _distributor)",

    // ---------------- PRODUCTS ----------------

    "function productCount() view returns (uint256)",

    "function products(uint256) view returns (" +
        "uint256 id," +
        "string name," +
        "string location," +
        "string status," +
        "uint256 timestamp," +
        "address createdBy," +
        "bool exists" +
    ")",

    "function addProduct(" +
        "string _name," +
        "string _location," +
        "string _status" +
    ")",

    "function updateProduct(" +
        "uint256 _id," +
        "string _location," +
        "string _status" +
    ")",

    // ---------------- TRACKING ----------------

    "function getTrackingHistory(uint256 _id) view returns (" +
        "(string location,string status,uint256 timestamp,address updatedBy)[]" +
    ")",

    // ---------------- VERIFICATION ----------------

    "function verifyProduct(uint256 _id) view returns (" +
        "bool exists," +
        "string name," +
        "string location," +
        "string status," +
        "uint256 timestamp," +
        "address createdBy" +
    ")"
];


// ============================================================
// 2. GLOBAL VARIABLES
// ============================================================

let provider = null;
let signer = null;
let contract = null;

let currentAccount = null;
let currentProductId = null;

let html5QrCode = null;
let scannerRunning = false;


// ============================================================
// 3. READ-ONLY PROVIDER
// ============================================================

function getReadOnlyProvider() {

    return new ethers.JsonRpcProvider(
        "http://127.0.0.1:8545"
    );
}


// ============================================================
// 4. READ-ONLY CONTRACT
// ============================================================

function getReadOnlyContract() {

    const readProvider = getReadOnlyProvider();

    return new ethers.Contract(
        contractAddress,
        contractABI,
        readProvider
    );
}


// ============================================================
// 5. CONNECTED CONTRACT
// ============================================================

async function getContract() {

    if (!window.ethereum) {
        throw new Error(
            "MetaMask is not installed."
        );
    }

    const browserProvider =
        new ethers.BrowserProvider(
            window.ethereum
        );

    const connectedSigner =
        await browserProvider.getSigner();

    return new ethers.Contract(
        contractAddress,
        contractABI,
        connectedSigner
    );
}


// ============================================================
// 6. CONNECT WALLET
// ============================================================

async function connectWallet() {

    try {

        if (!window.ethereum) {

            showMessage(
                "connectionStatus",
                "Please install MetaMask first.",
                "error"
            );

            return;
        }

        provider =
            new ethers.BrowserProvider(
                window.ethereum
            );

        await provider.send(
            "eth_requestAccounts",
            []
        );

        signer =
            await provider.getSigner();

        currentAccount =
            await signer.getAddress();

        contract =
            new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );

        const role =
            await getUserRole(currentAccount);

        setElementText(
            "walletAddress",
            shortenAddress(currentAccount)
        );

        setElementText(
            "userRole",
            role
        );

        showMessage(
            "connectionStatus",
            "Wallet connected successfully.",
            "success"
        );

        updateRoleUI(role);

        await loadDashboard();
        await loadProducts();

    } catch (error) {

        console.error(
            "Wallet connection error:",
            error
        );

        showMessage(
            "connectionStatus",
            getErrorMessage(error),
            "error"
        );
    }
}


// ============================================================
// 7. GET USER ROLE
// ============================================================

async function getUserRole(address) {

    try {

        const readContract =
            getReadOnlyContract();

        const ownerAddress =
            await readContract.owner();

        const isManufacturer =
            await readContract.manufacturers(address);

        const isDistributor =
            await readContract.distributors(address);

        if (
            address.toLowerCase() ===
            ownerAddress.toLowerCase()
        ) {
            return "Owner";
        }

        if (isManufacturer) {
            return "Manufacturer";
        }

        if (isDistributor) {
            return "Distributor";
        }

        return "Viewer";

    } catch (error) {

        console.error(
            "Role error:",
            error
        );

        return "Viewer";
    }
}


// ============================================================
// 8. UPDATE ROLE UI
// ============================================================

function updateRoleUI(role) {

    const addProductSection =
        document.getElementById(
            "addProductSection"
        );

    const updateProductSection =
        document.getElementById(
            "updateProductSection"
        );

    const accessControlSection =
        document.getElementById(
            "accessControlSection"
        );


    // ---------------- ADD PRODUCT ----------------

    if (addProductSection) {

        if (
            role === "Owner" ||
            role === "Manufacturer"
        ) {

            addProductSection.style.display =
                "block";

        } else {

            addProductSection.style.display =
                "none";
        }
    }


    // ---------------- UPDATE PRODUCT ----------------

    if (updateProductSection) {

        if (
            role === "Owner" ||
            role === "Manufacturer" ||
            role === "Distributor"
        ) {

            updateProductSection.style.display =
                "block";

        } else {

            updateProductSection.style.display =
                "none";
        }
    }


    // ---------------- ACCESS CONTROL ----------------

    if (accessControlSection) {

        if (role === "Owner") {

            accessControlSection.style.display =
                "block";

        } else {

            accessControlSection.style.display =
                "none";
        }
    }
}


// ============================================================
// 9. ADD PRODUCT
// ============================================================

async function addProduct() {

    try {

        const name =
            document.getElementById(
                "productName"
            ).value.trim();

        const location =
            document.getElementById(
                "productLocation"
            ).value.trim();

        const status =
            document.getElementById(
                "productStatus"
            ).value.trim();


        if (!name || !location || !status) {

            showMessage(
                "addProductMessage",
                "Please fill all product fields.",
                "error"
            );

            return;
        }


        if (!contract) {

            contract =
                await getContract();
        }


        showMessage(
            "addProductMessage",
            "Waiting for MetaMask confirmation...",
            "info"
        );


        const tx =
            await contract.addProduct(
                name,
                location,
                status
            );


        showMessage(
            "addProductMessage",
            "Transaction submitted. Waiting for confirmation...",
            "info"
        );


        // IMPORTANT:
        // Wait only once.

        const receipt =
            await tx.wait();


        await showTransactionDetails(
            "Add Product",
            tx,
            receipt
        );


        const readContract =
            getReadOnlyContract();

        const count =
            await readContract.productCount();

        currentProductId =
            Number(count);


        document.getElementById(
            "productName"
        ).value = "";

        document.getElementById(
            "productLocation"
        ).value = "";

        document.getElementById(
            "productStatus"
        ).value = "";


        showMessage(
            "addProductMessage",
            `Product added successfully. Product ID: ${currentProductId}`,
            "success"
        );


        await loadDashboard();
        await loadProducts();

        await viewProduct(
            currentProductId
        );

    } catch (error) {

        console.error(
            "Add product error:",
            error
        );

        showMessage(
            "addProductMessage",
            getErrorMessage(error),
            "error"
        );
    }
}


// ============================================================
// 10. LOAD DASHBOARD
// ============================================================

async function loadDashboard() {

    try {

        const readContract =
            getReadOnlyContract();

        const count =
            await readContract.productCount();

        let manufactured = 0;
        let transit = 0;
        let delivered = 0;


        for (
            let i = 1;
            i <= Number(count);
            i++
        ) {

            const product =
                await readContract.products(i);

            if (!product.exists) {
                continue;
            }

            const status =
                product.status
                    .toLowerCase()
                    .trim();


            if (
                status.includes(
                    "manufactured"
                )
            ) {

                manufactured++;

            } else if (
                status.includes(
                    "transit"
                ) ||
                status.includes(
                    "in transit"
                )
            ) {

                transit++;

            } else if (
                status.includes(
                    "delivered"
                )
            ) {

                delivered++;
            }
        }


        setElementText(
            "totalProducts",
            Number(count)
        );

        setElementText(
            "manufacturedProducts",
            manufactured
        );

        setElementText(
            "transitProducts",
            transit
        );

        setElementText(
            "deliveredProducts",
            delivered
        );

    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );
    }
}


// ============================================================
// 11. LOAD PRODUCTS
// ============================================================

async function loadProducts() {

    try {

        const readContract =
            getReadOnlyContract();

        const count =
            await readContract.productCount();

        const tableBody =
            document.getElementById(
                "productTableBody"
            );

        if (!tableBody) {
            return;
        }

        tableBody.innerHTML = "";


        if (Number(count) === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="6">
                        No products found.
                    </td>
                </tr>
            `;

            return;
        }


        for (
            let i = 1;
            i <= Number(count);
            i++
        ) {

            const product =
                await readContract.products(i);

            if (!product.exists) {
                continue;
            }


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${Number(product.id)}
                </td>

                <td>
                    ${escapeHTML(product.name)}
                </td>

                <td>
                    ${escapeHTML(product.location)}
                </td>

                <td>
                    <span class="status-badge">
                        ${escapeHTML(product.status)}
                    </span>
                </td>

                <td>
                    ${formatTimestamp(
                        Number(product.timestamp)
                    )}
                </td>

                <td>

                    <button
                        onclick="viewProduct(${Number(product.id)})"
                    >
                        View
                    </button>

                </td>
            `;


            tableBody.appendChild(row);
        }

    } catch (error) {

        console.error(
            "Load products error:",
            error
        );
    }
}


// ============================================================
// 12. FILTER PRODUCTS
// ============================================================

function filterProducts() {

    const searchInput =
        document.getElementById(
            "productSearch"
        );

    const tableBody =
        document.getElementById(
            "productTableBody"
        );

    if (!searchInput || !tableBody) {
        return;
    }


    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const rows =
        tableBody.querySelectorAll(
            "tr"
        );


    rows.forEach(row => {

        const text =
            row.textContent
                .toLowerCase();

        row.style.display =
            text.includes(search)
                ? ""
                : "none";
    });
}


// ============================================================
// 13. VIEW PRODUCT
// ============================================================

async function viewProduct(id) {

    try {

        const readContract =
            getReadOnlyContract();

        const product =
            await readContract.products(id);

        if (!product.exists) {

            alert(
                "Product not found."
            );

            return;
        }


        currentProductId =
            Number(id);


        setElementText(
            "detailsProductName",
            product.name
        );

        setElementText(
            "detailsProductStatus",
            product.status
        );

        setElementText(
            "detailsProductId",
            Number(product.id)
        );

        setElementText(
            "detailsProductLocation",
            product.location
        );

        setElementText(
            "detailsProductCreator",
            product.createdBy
        );

        setElementText(
            "detailsProductTimestamp",
            formatTimestamp(
                Number(product.timestamp)
            )
        );


        await loadTrackingHistory(id);


        // ---------------- QR PRODUCT ID ----------------

        const qrProductId =
            document.getElementById(
                "qrProductId"
            );

        if (qrProductId) {

            qrProductId.textContent =
                Number(id);
        }


        // ---------------- DETAILS SECTION ----------------

        const detailsSection =
            document.getElementById(
                "productDetails"
            );

        if (detailsSection) {

            detailsSection.scrollIntoView({
                behavior: "smooth"
            });
        }

    } catch (error) {

        console.error(
            "View product error:",
            error
        );

        alert(
            getErrorMessage(error)
        );
    }
}


// ============================================================
// 14. FIND PRODUCT
// ============================================================

async function findProduct() {

    try {

        const idInput =
            document.getElementById(
                "findProductId"
            );

        const id =
            Number(idInput.value);


        if (!id || id <= 0) {

            showMessage(
                "findProductMessage",
                "Enter a valid Product ID.",
                "error"
            );

            return;
        }


        const readContract =
            getReadOnlyContract();

        const product =
            await readContract.products(id);


        if (!product.exists) {

            showMessage(
                "findProductMessage",
                "Product not found.",
                "error"
            );

            return;
        }


        showMessage(
            "findProductMessage",
            "Product found successfully.",
            "success"
        );


        await viewProduct(id);

    } catch (error) {

        console.error(
            "Find product error:",
            error
        );

        showMessage(
            "findProductMessage",
            getErrorMessage(error),
            "error"
        );
    }
}


// ============================================================
// 15. UPDATE PRODUCT
// ============================================================

async function updateProduct() {

    try {

        const id =
            Number(
                document.getElementById(
                    "updateProductId"
                ).value
            );

        const location =
            document.getElementById(
                "updateLocation"
            ).value.trim();

        const status =
            document.getElementById(
                "updateStatus"
            ).value.trim();


        if (!id || id <= 0) {

            showMessage(
                "updateProductMessage",
                "Enter a valid Product ID.",
                "error"
            );

            return;
        }


        if (!location || !status) {

            showMessage(
                "updateProductMessage",
                "Please enter location and status.",
                "error"
            );

            return;
        }


        if (!contract) {

            contract =
                await getContract();
        }


        showMessage(
            "updateProductMessage",
            "Waiting for MetaMask confirmation...",
            "info"
        );


        const tx =
            await contract.updateProduct(
                id,
                location,
                status
            );


        showMessage(
            "updateProductMessage",
            "Transaction submitted. Waiting for confirmation...",
            "info"
        );


        const receipt =
            await tx.wait();


        await showTransactionDetails(
            "Update Product",
            tx,
            receipt
        );


        showMessage(
            "updateProductMessage",
            "Product updated successfully.",
            "success"
        );


        document.getElementById(
            "updateLocation"
        ).value = "";

        document.getElementById(
            "updateStatus"
        ).value = "";


        await loadDashboard();
        await loadProducts();

        await viewProduct(id);

    } catch (error) {

        console.error(
            "Update product error:",
            error
        );

        showMessage(
            "updateProductMessage",
            getErrorMessage(error),
            "error"
        );
    }
}


// ============================================================
// 16. LOAD TRACKING HISTORY
// ============================================================

async function loadTrackingHistory(id) {

    try {

        const readContract =
            getReadOnlyContract();

        const history =
            await readContract.getTrackingHistory(
                id
            );


        const container =
            document.getElementById(
                "detailsTrackingHistory"
            );

        if (!container) {
            return;
        }


        container.innerHTML = "";


        if (history.length === 0) {

            container.innerHTML =
                "<p>No tracking history available.</p>";

            return;
        }


        history.forEach(
            (item, index) => {

                const div =
                    document.createElement(
                        "div"
                    );

                div.className =
                    "tracking-item";


                div.innerHTML = `

                    <h4>
                        Stage ${index + 1}
                    </h4>

                    <p>
                        <strong>Location:</strong>
                        ${escapeHTML(item.location)}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        ${escapeHTML(item.status)}
                    </p>

                    <p>
                        <strong>Time:</strong>
                        ${formatTimestamp(
                            Number(item.timestamp)
                        )}
                    </p>

                    <p>
                        <strong>Updated By:</strong>
                        ${escapeHTML(item.updatedBy)}
                    </p>
                `;


                container.appendChild(div);
            }
        );

    } catch (error) {

        console.error(
            "Tracking history error:",
            error
        );
    }
}


// ============================================================
// 17. SHOW TRACKING
// ============================================================

async function showTracking() {

    try {

        const id =
            Number(
                document.getElementById(
                    "trackingProductId"
                ).value
            );


        if (!id || id <= 0) {

            showMessage(
                "trackingResult",
                "Enter a valid Product ID.",
                "error"
            );

            return;
        }


        const readContract =
            getReadOnlyContract();

        const product =
            await readContract.products(id);


        if (!product.exists) {

            showMessage(
                "trackingResult",
                "Product not found.",
                "error"
            );

            return;
        }


        const history =
            await readContract.getTrackingHistory(
                id
            );


        const result =
            document.getElementById(
                "trackingResult"
            );


        result.innerHTML = `

            <h3>
                Product #${id}
            </h3>

            <p>
                <strong>Product:</strong>
                ${escapeHTML(product.name)}
            </p>

            <div class="tracking-list">
        `;


        history.forEach(
            (item, index) => {

                result.innerHTML += `

                    <div class="tracking-item">

                        <h4>
                            Stage ${index + 1}
                        </h4>

                        <p>
                            <strong>Location:</strong>
                            ${escapeHTML(item.location)}
                        </p>

                        <p>
                            <strong>Status:</strong>
                            ${escapeHTML(item.status)}
                        </p>

                        <p>
                            <strong>Date:</strong>
                            ${formatTimestamp(
                                Number(item.timestamp)
                            )}
                        </p>

                        <p>
                            <strong>Updated By:</strong>
                            ${escapeHTML(item.updatedBy)}
                        </p>

                    </div>
                `;
            }
        );


        result.innerHTML += "</div>";

    } catch (error) {

        console.error(
            "Show tracking error:",
            error
        );

        showMessage(
            "trackingResult",
            getErrorMessage(error),
            "error"
        );
    }
}


// ============================================================
// 18. VERIFY PRODUCT
// ============================================================

async function verifyProduct() {

    try {

        const id =
            Number(
                document.getElementById(
                    "verifyProductId"
                ).value
            );


        if (!id || id <= 0) {

            showMessage(
                "verifyResult",
                "Enter a valid Product ID.",
                "error"
            );

            return;
        }


        const readContract =
            getReadOnlyContract();


        const result =
            await readContract.verifyProduct(
                id
            );


        if (!result.exists) {

            showMessage(
                "verifyResult",
                "Product does not exist on the blockchain.",
                "error"
            );

            return;
        }


        const verifyResult =
            document.getElementById(
                "verifyResult"
            );


        verifyResult.innerHTML = `

            <div class="verification-success">

                <h3>
                    ✓ Product Verified
                </h3>

                <p>
                    <strong>Product ID:</strong>
                    ${id}
                </p>

                <p>
                    <strong>Name:</strong>
                    ${escapeHTML(result.name)}
                </p>

                <p>
                    <strong>Location:</strong>
                    ${escapeHTML(result.location)}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${escapeHTML(result.status)}
                </p>

                <p>
                    <strong>Created By:</strong>
                    ${escapeHTML(result.createdBy)}
                </p>

                <p>
                    <strong>Created:</strong>
                    ${formatTimestamp(
                        Number(result.timestamp)
                    )}
                </p>

            </div>
        `;

    } catch (error) {

        console.error(
            "Verify product error:",
            error
        );

        showMessage(
            "verifyResult",
            getErrorMessage(error),
            "error"
        );
    }
}


// ============================================================
// 19. ADD MANUFACTURER
// ============================================================

async function addManufacturer() {

    try {

        const address =
            document.getElementById(
                "manufacturerAddress"
            ).value.trim();


        if (!ethers.isAddress(address)) {

            showMessage(
                "accessMessage",
                "Enter a valid Ethereum address.",
                "error"
            );

            return;
        }


        if (!contract) {

            contract =
                await getContract();
        }


        showMessage(
            "accessMessage",
            "Waiting for MetaMask confirmation...",
            "info"
        );


        const tx =
            await contract.addManufacturer(
                address
            );


        const receipt =
            await tx.wait();


        await showTransactionDetails(
            "Add Manufacturer",
            tx,
            receipt
        );


        document.getElementById(
            "manufacturerAddress"
        ).value = "";


        showMessage(
            "accessMessage",
            "Manufacturer added successfully.",
            "success"
        );

    } catch (error) {

        console.error(
            "Add manufacturer error:",
            error
        );

        showMessage(
            "accessMessage",
            getErrorMessage(error),
            "error"
        );
    }
}


// ============================================================
// 20. ADD DISTRIBUTOR
// ============================================================

async function addDistributor() {

    try {

        const address =
            document.getElementById(
                "distributorAddress"
            ).value.trim();


        if (!ethers.isAddress(address)) {

            showMessage(
                "accessMessage",
                "Enter a valid Ethereum address.",
                "error"
            );

            return;
        }


        if (!contract) {

            contract =
                await getContract();
        }


        showMessage(
            "accessMessage",
            "Waiting for MetaMask confirmation...",
            "info"
        );


        const tx =
            await contract.addDistributor(
                address
            );


        const receipt =
            await tx.wait();


        await showTransactionDetails(
            "Add Distributor",
            tx,
            receipt
        );


        document.getElementById(
            "distributorAddress"
        ).value = "";


        showMessage(
            "accessMessage",
            "Distributor added successfully.",
            "success"
        );

    } catch (error) {

        console.error(
            "Add distributor error:",
            error
        );

        showMessage(
            "accessMessage",
            getErrorMessage(error),
            "error"
        );
    }
}


// ============================================================
// 21. GENERATE QR CODE
// ============================================================

function generateQRCode(id = null) {

    try {

        const productId =
            Number(
                id || currentProductId
            );


        if (!productId || productId <= 0) {

            alert(
                "Please select a valid product first."
            );

            return;
        }


        const qrContainer =
            document.getElementById(
                "qrcode"
            );


        if (!qrContainer) {
            return;
        }


        qrContainer.innerHTML = "";


        const qrUrl =
            `${window.location.origin}${window.location.pathname}?product=${productId}`;


        new QRCode(
            qrContainer,
            {
                text: qrUrl,
                width: 220,
                height: 220
            }
        );


        const qrProductId =
            document.getElementById(
                "qrProductId"
            );

        if (qrProductId) {

            qrProductId.textContent =
                productId;
        }


        currentProductId =
            productId;

    } catch (error) {

        console.error(
            "QR generation error:",
            error
        );
    }
}


// ============================================================
// 22. START QR SCANNER
// ============================================================

async function startScanner() {

    try {

        if (scannerRunning) {
            return;
        }


        html5QrCode =
            new Html5Qrcode(
                "qr-reader"
            );


        await html5QrCode.start(

            {
                facingMode: "environment"
            },

            {
                fps: 10,
                qrbox: 250
            },

            onQRCodeSuccess,
            onQRCodeError

        );


        scannerRunning = true;


        showMessage(
            "scannerResult",
            "Scanner started.",
            "success"
        );

    } catch (error) {

        console.error(
            "Scanner error:",
            error
        );

        showMessage(
            "scannerResult",
            "Unable to start camera scanner.",
            "error"
        );
    }
}


// ============================================================
// 23. QR SUCCESS
// ============================================================

async function onQRCodeSuccess(decodedText) {

    try {

        console.log(
            "QR Code:",
            decodedText
        );


        let productId = null;


        // ---------------- URL ----------------

        if (
            decodedText.includes(
                "?product="
            )
        ) {

            const url =
                new URL(decodedText);

            productId =
                Number(
                    url.searchParams.get(
                        "product"
                    )
                );

        } else {

            // ---------------- NUMBER ----------------

            productId =
                Number(decodedText);
        }


        if (!productId || productId <= 0) {

            showMessage(
                "scannerResult",
                "Invalid product QR code.",
                "error"
            );

            return;
        }


        showMessage(
            "scannerResult",
            `Product ID ${productId} detected.`,
            "success"
        );


        await viewProduct(
            productId
        );


        document.getElementById(
            "productDetails"
        )?.scrollIntoView({
            behavior: "smooth"
        });

    } catch (error) {

        console.error(
            "QR processing error:",
            error
        );

        showMessage(
            "scannerResult",
            "Unable to process QR code.",
            "error"
        );
    }
}


// ============================================================
// 24. QR ERROR
// ============================================================

function onQRCodeError(errorMessage) {

    // Scanner continuously sends
    // temporary scan errors.
    // We don't display every error
    // to avoid disturbing the user.
}


// ============================================================
// 25. STOP SCANNER
// ============================================================

async function stopScanner() {

    try {

        if (
            html5QrCode &&
            scannerRunning
        ) {

            await html5QrCode.stop();

            html5QrCode.clear();

            scannerRunning = false;


            showMessage(
                "scannerResult",
                "Scanner stopped.",
                "info"
            );
        }

    } catch (error) {

        console.error(
            "Stop scanner error:",
            error
        );
    }
}


// ============================================================
// 26. TRANSACTION DETAILS
// ============================================================

async function showTransactionDetails(
    type,
    transaction,
    receipt
) {

    try {

        setElementText(
            "transactionType",
            type
        );


        setElementText(
            "transactionHash",
            transaction.hash
        );


        setElementText(
            "transactionStatus",
            "Confirmed"
        );


        setElementText(
            "transactionBlock",
            receipt.blockNumber
        );


        setElementText(
            "transactionFrom",
            transaction.from
        );


        setElementText(
            "transactionTo",
            transaction.to
        );


        let gasUsed = "N/A";


        if (receipt.gasUsed) {

            gasUsed =
                receipt.gasUsed.toString();
        }


        setElementText(
            "transactionGasUsed",
            gasUsed
        );


        const transactionSection =
            document.getElementById(
                "transactions"
            );


        if (transactionSection) {

            transactionSection.scrollIntoView({
                behavior: "smooth"
            });
        }

    } catch (error) {

        console.error(
            "Transaction details error:",
            error
        );
    }
}


// ============================================================
// 27. LOAD PRODUCT FROM URL
// ============================================================

async function loadProductFromURL() {

    try {

        const params =
            new URLSearchParams(
                window.location.search
            );


        const productId =
            params.get("product");


        if (
            productId &&
            Number(productId) > 0
        ) {

            await viewProduct(
                Number(productId)
            );
        }

    } catch (error) {

        console.error(
            "URL product error:",
            error
        );
    }
}


// ============================================================
// 28. SET ELEMENT TEXT
// ============================================================

function setElementText(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (element) {

        element.textContent =
            value ?? "";
    }
}


// ============================================================
// 29. FORMAT TIMESTAMP
// ============================================================

function formatTimestamp(
    timestamp
) {

    if (!timestamp) {
        return "N/A";
    }


    const date =
        new Date(
            timestamp * 1000
        );


    return date.toLocaleString();
}


// ============================================================
// 30. SHORTEN ADDRESS
// ============================================================

function shortenAddress(
    address
) {

    if (!address) {
        return "";
    }


    return (
        address.substring(0, 6) +
        "..." +
        address.substring(
            address.length - 4
        )
    );
}


// ============================================================
// 31. ESCAPE HTML
// ============================================================

function escapeHTML(
    value
) {

    if (value === null ||
        value === undefined) {

        return "";
    }


    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}


// ============================================================
// 32. ERROR MESSAGE
// ============================================================

function getErrorMessage(
    error
) {

    console.error(
        error
    );


    if (
        error?.code ===
        "ACTION_REJECTED"
    ) {

        return "Transaction was rejected in MetaMask.";
    }


    if (
        error?.code ===
        "INSUFFICIENT_FUNDS"
    ) {

        return "Insufficient ETH balance for this transaction.";
    }


    if (
        error?.code ===
        "NETWORK_ERROR"
    ) {

        return "Network connection error. Make sure Hardhat node is running.";
    }


    if (
        error?.message?.includes(
            "ECONNREFUSED"
        )
    ) {

        return "Cannot connect to Hardhat. Please run npx hardhat node.";
    }


    if (
        error?.message?.includes(
            "Only manufacturer"
        )
    ) {

        return "Only a registered manufacturer can add products.";
    }


    if (
        error?.message?.includes(
            "Not authorized"
        )
    ) {

        return "Your wallet is not authorized to perform this action.";
    }


    if (
        error?.message?.includes(
            "Only owner"
        )
    ) {

        return "Only the owner can perform this action.";
    }


    if (
        error?.reason
    ) {

        return error.reason;
    }


    if (
        error?.shortMessage
    ) {

        return error.shortMessage;
    }


    if (
        error?.message
    ) {

        return error.message;
    }


    return "An unexpected error occurred.";
}


// ============================================================
// 33. SHOW MESSAGE
// ============================================================

function showMessage(
    elementId,
    message,
    type = "info"
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {
        return;
    }


    element.textContent =
        message;


    element.className =
        `message ${type}`;
}


// ============================================================
// 34. METAMASK ACCOUNT CHANGE
// ============================================================

if (window.ethereum) {

    window.ethereum.on(
        "accountsChanged",
        async function(accounts) {

            if (
                !accounts ||
                accounts.length === 0
            ) {

                currentAccount = null;
                signer = null;
                contract = null;

                setElementText(
                    "walletAddress",
                    "Not connected"
                );

                setElementText(
                    "userRole",
                    "Viewer"
                );

                updateRoleUI(
                    "Viewer"
                );

                return;
            }


            try {

                provider =
                    new ethers.BrowserProvider(
                        window.ethereum
                    );

                signer =
                    await provider.getSigner();

                currentAccount =
                    accounts[0];


                contract =
                    new ethers.Contract(
                        contractAddress,
                        contractABI,
                        signer
                    );


                const role =
                    await getUserRole(
                        currentAccount
                    );


                setElementText(
                    "walletAddress",
                    shortenAddress(
                        currentAccount
                    )
                );

                setElementText(
                    "userRole",
                    role
                );


                updateRoleUI(
                    role
                );


                await loadDashboard();
                await loadProducts();

            } catch (error) {

                console.error(
                    "Account change error:",
                    error
                );
            }
        }
    );


    window.ethereum.on(
        "chainChanged",
        function() {

            window.location.reload();
        }
    );
}


// ============================================================
// 35. PAGE LOAD
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    async function() {

        try {

            await loadDashboard();

            await loadProducts();

            await loadProductFromURL();


            // ------------------------------------------------
            // Automatically detect already connected MetaMask
            // ------------------------------------------------

            if (window.ethereum) {

                const accounts =
                    await window.ethereum.request({
                        method: "eth_accounts"
                    });


                if (
                    accounts &&
                    accounts.length > 0
                ) {

                    await connectWallet();
                }
            }

        } catch (error) {

            console.error(
                "Page initialization error:",
                error
            );
        }
    }
);