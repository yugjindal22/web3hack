// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract PublicRecord {
    event NextAddressAdded(address NextAddress);

    string public recordName;
    bytes public EncryptedFileData;
    address public NextAddress;

    constructor(string memory name, bytes memory data) {
        recordName = name;
        EncryptedFileData = data;
    }

    function update(address nextAddress) public {
        NextAddress = nextAddress;

        emit NextAddressAdded(NextAddress);
    }
}
