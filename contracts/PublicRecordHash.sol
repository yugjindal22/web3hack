// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract PublicRecordHash {
    string public recordName;
    bytes32 public FileHash;

    constructor(string memory name, bytes32 m_hash) {
        recordName = name;
        FileHash = m_hash;
    }
}
