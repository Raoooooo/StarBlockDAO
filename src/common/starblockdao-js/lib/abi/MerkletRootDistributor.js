"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerkletRootDistributor = void 0;
exports.MerkletRootDistributor = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_looksRareToken",
                type: "address"
            }
        ],
        stateMutability: "nonpayable",
        type: "constructor"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "user",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "rewardRound",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "totalAmount",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint8[]",
                name: "treeIds",
                type: "uint8[]"
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]"
            }
        ],
        name: "Claim",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint8",
                name: "treeId",
                type: "uint8"
            }
        ],
        name: "NewTree",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address"
            }
        ],
        name: "OwnershipTransferred",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "Paused",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            }
        ],
        name: "TokenWithdrawnOwner",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "Unpaused",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "rewardRound",
                type: "uint256"
            }
        ],
        name: "UpdateTradingRewards",
        type: "event"
    },
    {
        inputs: [],
        name: "BUFFER_ADMIN_WITHDRAW",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "SAFE_GUARD_AMOUNT",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "safeGuard",
                type: "address"
            }
        ],
        name: "addNewTree",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            },
            {
                internalType: "uint8",
                name: "",
                type: "uint8"
            }
        ],
        name: "amountClaimedByUserPerTreeId",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "user",
                type: "address"
            },
            {
                internalType: "uint8[]",
                name: "treeIds",
                type: "uint8[]"
            },
            {
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]"
            },
            {
                internalType: "bytes32[][]",
                name: "merkleProofs",
                type: "bytes32[][]"
            }
        ],
        name: "canClaim",
        outputs: [
            {
                internalType: "bool[]",
                name: "",
                type: "bool[]"
            },
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint8[]",
                name: "treeIds",
                type: "uint8[]"
            },
            {
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]"
            },
            {
                internalType: "bytes32[][]",
                name: "merkleProofs",
                type: "bytes32[][]"
            }
        ],
        name: "claim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "currentRewardRound",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "lastPausedTimestamp",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "looksRareToken",
        outputs: [
            {
                internalType: "contract IERC20",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            }
        ],
        name: "merkleRootUsed",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "numberTrees",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "pauseDistribution",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "paused",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        name: "safeGuardUsed",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address"
            }
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8"
            }
        ],
        name: "treeParameters",
        outputs: [
            {
                internalType: "address",
                name: "safeGuard",
                type: "address"
            },
            {
                internalType: "bytes32",
                name: "merkleRoot",
                type: "bytes32"
            },
            {
                internalType: "uint256",
                name: "maxAmountPerUserInCurrentTree",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "unpauseDistribution",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint8[]",
                name: "treeIds",
                type: "uint8[]"
            },
            {
                internalType: "bytes32[]",
                name: "merkleRoots",
                type: "bytes32[]"
            },
            {
                internalType: "uint256[]",
                name: "maxAmountsPerUser",
                type: "uint256[]"
            },
            {
                internalType: "bytes32[][]",
                name: "merkleProofsSafeGuards",
                type: "bytes32[][]"
            }
        ],
        name: "updateTradingRewards",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            }
        ],
        name: "withdrawTokenRewards",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }
];
