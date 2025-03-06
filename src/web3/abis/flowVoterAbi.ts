
const FLOW_VOTER_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_bridge",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_recipient",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "GaugeAlreadyKilled",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "GaugeAlreadyRevived",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotAGauge",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotAuthorized",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ReentrancyGuardReentrantCall",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ZeroAddress",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "poolFactory",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "votingRewardsFactory",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "gaugeFactory",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "pool",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "incentiveVotingReward",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "feeVotingReward",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "gauge",
        "type": "address"
      }
    ],
    "name": "GaugeCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "gauge",
        "type": "address"
      }
    ],
    "name": "GaugeKilled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "gauge",
        "type": "address"
      }
    ],
    "name": "GaugeRevived",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "bool",
        "name": "_bool",
        "type": "bool"
      }
    ],
    "name": "WhitelistToken",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "bridge",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "_gauges",
        "type": "address[]"
      }
    ],
    "name": "claimRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_poolFactory",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_pool",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_votingRewardsFactory",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_gaugeFactory",
        "type": "address"
      }
    ],
    "name": "createGauge",
    "outputs": [
      {
        "internalType": "address",
        "name": "_gauge",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "gaugeToFees",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "gaugeToIncentive",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "gauges",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "isAlive",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "isGauge",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_token",
        "type": "address"
      }
    ],
    "name": "isWhitelistedToken",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_gauge",
        "type": "address"
      }
    ],
    "name": "killGauge",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "poolForGauge",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "pools",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_gauge",
        "type": "address"
      }
    ],
    "name": "reviveGauge",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "sfs",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tokenId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "whitelistTokenCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "whitelistedTokens",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_start",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_end",
        "type": "uint256"
      }
    ],
    "name": "whitelistedTokens",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "_tokens",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "whitelistedTokensLength",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export default FLOW_VOTER_ABI


// const SICKLE_FACTORY_ABI = [{"inputs":[{"internalType":"address","name":"admin_","type":"address"},{"internalType":"address","name":"sickleRegistry_","type":"address"},{"internalType":"address","name":"sickleImplementation_","type":"address"},{"internalType":"address","name":"previousFactory_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"caller","type":"address"}],"name":"CallerNotWhitelisted","type":"error"},{"inputs":[],"name":"NotActive","type":"error"},{"inputs":[],"name":"NotAdminError","type":"error"},{"inputs":[],"name":"SickleAlreadyDeployed","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"admin","type":"address"},{"indexed":false,"internalType":"address","name":"sickle","type":"address"}],"name":"Deploy","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_referralCodes","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"sickle","type":"address"}],"name":"admins","outputs":[{"internalType":"address","name":"admin","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"approved","type":"address"},{"internalType":"bytes32","name":"referralCode","type":"bytes32"}],"name":"deploy","outputs":[{"internalType":"address","name":"sickle","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"admin","type":"address"},{"internalType":"address","name":"approved","type":"address"},{"internalType":"bytes32","name":"referralCode","type":"bytes32"}],"name":"getOrDeploy","outputs":[{"internalType":"address","name":"sickle","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"admin","type":"address"}],"name":"predict","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"previousFactory","outputs":[{"internalType":"contract SickleFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"sickle","type":"address"}],"name":"referralCodes","outputs":[{"internalType":"bytes32","name":"referralCode","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"registry","outputs":[{"internalType":"contract SickleRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"active","type":"bool"}],"name":"setActive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"setAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"admin","type":"address"}],"name":"sickles","outputs":[{"internalType":"address","name":"sickle","type":"address"}],"stateMutability":"view","type":"function"}]

// const SICKLE_ABI = [{"inputs":[{"internalType":"address","name":"sickleRegistry_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"caller","type":"address"}],"name":"CallerNotWhitelisted","type":"error"},{"inputs":[],"name":"MulticallParamsMismatchError","type":"error"},{"inputs":[],"name":"NotOwnerError","type":"error"},{"inputs":[],"name":"NotStrategyError","type":"error"},{"inputs":[{"internalType":"address","name":"target","type":"address"}],"name":"TargetNotWhitelisted","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"inputs":[],"name":"approved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"sickleOwner_","type":"address"},{"internalType":"address","name":"approved_","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"caller","type":"address"}],"name":"isOwnerOrApproved","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"targets","type":"address[]"},{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC1155BatchReceived","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC1155Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"registry","outputs":[{"internalType":"contract SickleRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newApproved","type":"address"}],"name":"setApproved","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

// const CL_GAUGE_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"claimed0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"claimed1","type":"uint256"}],"name":"ClaimFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ClaimRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"uint128","name":"liquidityToStake","type":"uint128"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NotifyReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"uint128","name":"liquidityToStake","type":"uint128"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"WETH9","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"decreaseStakedLiquidity","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesVotingReward","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gaugeFactory","outputs":[{"internalType":"contract ICLGaugeFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount0Desired","type":"uint256"},{"internalType":"uint256","name":"amount1Desired","type":"uint256"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"increaseStakedLiquidity","outputs":[{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"},{"internalType":"address","name":"_feesVotingReward","type":"address"},{"internalType":"address","name":"_rewardToken","type":"address"},{"internalType":"address","name":"_voter","type":"address"},{"internalType":"address","name":"_nft","type":"address"},{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"},{"internalType":"int24","name":"_tickSpacing","type":"int24"},{"internalType":"bool","name":"_isPool","type":"bool"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isPool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"left","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nft","outputs":[{"internalType":"contract INonfungiblePositionManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"notifyRewardWithoutClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pool","outputs":[{"internalType":"contract ICLPool","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardGrowthInside","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardRateByEpoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"stakedByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"stakedContains","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"}],"name":"stakedLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"}],"name":"stakedValues","outputs":[{"internalType":"uint256[]","name":"staked","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"supportsPayable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tickSpacing","outputs":[{"internalType":"int24","name":"","type":"int24"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"voter","outputs":[{"internalType":"contract IVoter","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

// const CL_TOKEN_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"int24","name":"tickLower","type":"int24"},{"indexed":true,"internalType":"int24","name":"tickUpper","type":"int24"},{"indexed":false,"internalType":"uint128","name":"amount","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":true,"internalType":"int24","name":"tickLower","type":"int24"},{"indexed":true,"internalType":"int24","name":"tickUpper","type":"int24"},{"indexed":false,"internalType":"uint128","name":"amount0","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"amount1","type":"uint128"}],"name":"Collect","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint128","name":"amount0","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"amount1","type":"uint128"}],"name":"CollectFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"paid0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"paid1","type":"uint256"}],"name":"Flash","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"observationCardinalityNextOld","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"observationCardinalityNextNew","type":"uint16"}],"name":"IncreaseObservationCardinalityNext","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"},{"indexed":false,"internalType":"int24","name":"tick","type":"int24"}],"name":"Initialize","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"int24","name":"tickLower","type":"int24"},{"indexed":true,"internalType":"int24","name":"tickUpper","type":"int24"},{"indexed":false,"internalType":"uint128","name":"amount","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"feeProtocol0Old","type":"uint8"},{"indexed":false,"internalType":"uint8","name":"feeProtocol1Old","type":"uint8"},{"indexed":false,"internalType":"uint8","name":"feeProtocol0New","type":"uint8"},{"indexed":false,"internalType":"uint8","name":"feeProtocol1New","type":"uint8"}],"name":"SetFeeProtocol","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"int256","name":"amount0","type":"int256"},{"indexed":false,"internalType":"int256","name":"amount1","type":"int256"},{"indexed":false,"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"},{"indexed":false,"internalType":"uint128","name":"liquidity","type":"uint128"},{"indexed":false,"internalType":"int24","name":"tick","type":"int24"}],"name":"Swap","type":"event"},{"inputs":[{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"amount","type":"uint128"},{"internalType":"address","name":"owner","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"amount","type":"uint128"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"amount0Requested","type":"uint128"},{"internalType":"uint128","name":"amount1Requested","type":"uint128"},{"internalType":"address","name":"owner","type":"address"}],"name":"collect","outputs":[{"internalType":"uint128","name":"amount0","type":"uint128"},{"internalType":"uint128","name":"amount1","type":"uint128"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"amount0Requested","type":"uint128"},{"internalType":"uint128","name":"amount1Requested","type":"uint128"}],"name":"collect","outputs":[{"internalType":"uint128","name":"amount0","type":"uint128"},{"internalType":"uint128","name":"amount1","type":"uint128"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collectFees","outputs":[{"internalType":"uint128","name":"amount0","type":"uint128"},{"internalType":"uint128","name":"amount1","type":"uint128"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factoryRegistry","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint24","name":"","type":"uint24"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeGrowthGlobal0X128","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeGrowthGlobal1X128","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"flash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"gauge","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gaugeFees","outputs":[{"internalType":"uint128","name":"token0","type":"uint128"},{"internalType":"uint128","name":"token1","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint256","name":"_rewardGrowthGlobalX128","type":"uint256"}],"name":"getRewardGrowthInside","outputs":[{"internalType":"uint256","name":"rewardGrowthInside","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"observationCardinalityNext","type":"uint16"}],"name":"increaseObservationCardinalityNext","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"},{"internalType":"int24","name":"_tickSpacing","type":"int24"},{"internalType":"address","name":"_factoryRegistry","type":"address"},{"internalType":"uint160","name":"_sqrtPriceX96","type":"uint160"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastUpdated","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidity","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxLiquidityPerTick","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"amount","type":"uint128"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"mint","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"nft","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"observations","outputs":[{"internalType":"uint32","name":"blockTimestamp","type":"uint32"},{"internalType":"int56","name":"tickCumulative","type":"int56"},{"internalType":"uint160","name":"secondsPerLiquidityCumulativeX128","type":"uint160"},{"internalType":"bool","name":"initialized","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32[]","name":"secondsAgos","type":"uint32[]"}],"name":"observe","outputs":[{"internalType":"int56[]","name":"tickCumulatives","type":"int56[]"},{"internalType":"uint160[]","name":"secondsPerLiquidityCumulativeX128s","type":"uint160[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"positions","outputs":[{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"feeGrowthInside0LastX128","type":"uint256"},{"internalType":"uint256","name":"feeGrowthInside1LastX128","type":"uint256"},{"internalType":"uint128","name":"tokensOwed0","type":"uint128"},{"internalType":"uint128","name":"tokensOwed1","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardGrowthGlobalX128","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardReserve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rollover","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_gauge","type":"address"},{"internalType":"address","name":"_nft","type":"address"}],"name":"setGaugeAndPositionManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"slot0","outputs":[{"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"},{"internalType":"int24","name":"tick","type":"int24"},{"internalType":"uint16","name":"observationIndex","type":"uint16"},{"internalType":"uint16","name":"observationCardinality","type":"uint16"},{"internalType":"uint16","name":"observationCardinalityNext","type":"uint16"},{"internalType":"bool","name":"unlocked","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"}],"name":"snapshotCumulativesInside","outputs":[{"internalType":"int56","name":"tickCumulativeInside","type":"int56"},{"internalType":"uint160","name":"secondsPerLiquidityInsideX128","type":"uint160"},{"internalType":"uint32","name":"secondsInside","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int128","name":"stakedLiquidityDelta","type":"int128"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"bool","name":"positionUpdate","type":"bool"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakedLiquidity","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"bool","name":"zeroForOne","type":"bool"},{"internalType":"int256","name":"amountSpecified","type":"int256"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[{"internalType":"int256","name":"amount0","type":"int256"},{"internalType":"int256","name":"amount1","type":"int256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardRate","type":"uint256"},{"internalType":"uint256","name":"_rewardReserve","type":"uint256"},{"internalType":"uint256","name":"_periodFinish","type":"uint256"}],"name":"syncReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int16","name":"","type":"int16"}],"name":"tickBitmap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tickSpacing","outputs":[{"internalType":"int24","name":"","type":"int24"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int24","name":"","type":"int24"}],"name":"ticks","outputs":[{"internalType":"uint128","name":"liquidityGross","type":"uint128"},{"internalType":"int128","name":"liquidityNet","type":"int128"},{"internalType":"int128","name":"stakedLiquidityNet","type":"int128"},{"internalType":"uint256","name":"feeGrowthOutside0X128","type":"uint256"},{"internalType":"uint256","name":"feeGrowthOutside1X128","type":"uint256"},{"internalType":"uint256","name":"rewardGrowthOutsideX128","type":"uint256"},{"internalType":"int56","name":"tickCumulativeOutside","type":"int56"},{"internalType":"uint160","name":"secondsPerLiquidityOutsideX128","type":"uint160"},{"internalType":"uint32","name":"secondsOutside","type":"uint32"},{"internalType":"bool","name":"initialized","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unstakedFee","outputs":[{"internalType":"uint24","name":"","type":"uint24"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"updateRewardsGrowthGlobal","outputs":[],"stateMutability":"nonpayable","type":"function"}]

// const NFT_VELO_ABI = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH9","type":"address"},{"internalType":"address","name":"_tokenDescriptor","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_fromTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_toTokenId","type":"uint256"}],"name":"BatchMetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Collect","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"liquidity","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"DecreaseLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"liquidity","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"IncreaseLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"MetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenDescriptor","type":"address"}],"name":"TokenDescriptorChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"}],"name":"TransferOwnership","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WETH9","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint128","name":"amount0Max","type":"uint128"},{"internalType":"uint128","name":"amount1Max","type":"uint128"}],"internalType":"struct INonfungiblePositionManager.CollectParams","name":"params","type":"tuple"}],"name":"collect","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct INonfungiblePositionManager.DecreaseLiquidityParams","name":"params","type":"tuple"}],"name":"decreaseLiquidity","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount0Desired","type":"uint256"},{"internalType":"uint256","name":"amount1Desired","type":"uint256"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct INonfungiblePositionManager.IncreaseLiquidityParams","name":"params","type":"tuple"}],"name":"increaseLiquidity","outputs":[{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"int24","name":"tickSpacing","type":"int24"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint256","name":"amount0Desired","type":"uint256"},{"internalType":"uint256","name":"amount1Desired","type":"uint256"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"}],"internalType":"struct INonfungiblePositionManager.MintParams","name":"params","type":"tuple"}],"name":"mint","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"positions","outputs":[{"internalType":"uint96","name":"nonce","type":"uint96"},{"internalType":"address","name":"operator","type":"address"},{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"int24","name":"tickSpacing","type":"int24"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"feeGrowthInside0LastX128","type":"uint256"},{"internalType":"uint256","name":"feeGrowthInside1LastX128","type":"uint256"},{"internalType":"uint128","name":"tokensOwed0","type":"uint128"},{"internalType":"uint128","name":"tokensOwed1","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"refundETH","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitAllowed","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitAllowedIfNecessary","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitIfNecessary","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenDescriptor","type":"address"}],"name":"setTokenDescriptor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"sweepToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenDescriptor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount0Owed","type":"uint256"},{"internalType":"uint256","name":"amount1Owed","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"uniswapV3MintCallback","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"unwrapWETH9","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]

// const NFT_FARM_STRATEGY_ABI = [
//   {
//     "inputs": [
//       {
//         "internalType": "contract SickleFactory",
//         "name": "factory",
//         "type": "address"
//       },
//       {
//         "internalType": "contract ConnectorRegistry",
//         "name": "connectorRegistry",
//         "type": "address"
//       },
//       {
//         "internalType": "contract INftSettingsRegistry",
//         "name": "nftSettingsRegistry_",
//         "type": "address"
//       },
//       {
//         "components": [
//           {
//             "internalType": "contract INftTransferLib",
//             "name": "nftTransferLib",
//             "type": "address"
//           },
//           {
//             "internalType": "contract ITransferLib",
//             "name": "transferLib",
//             "type": "address"
//           },
//           {
//             "internalType": "contract ISwapLib",
//             "name": "swapLib",
//             "type": "address"
//           },
//           {
//             "internalType": "contract IFeesLib",
//             "name": "feesLib",
//             "type": "address"
//           },
//           {
//             "internalType": "contract INftZapLib",
//             "name": "nftZapLib",
//             "type": "address"
//           },
//           {
//             "internalType": "contract INftSettingsLib",
//             "name": "nftSettingsLib",
//             "type": "address"
//           }
//         ],
//         "internalType": "struct NftFarmStrategy.Libraries",
//         "name": "libraries",
//         "type": "tuple"
//       }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "constructor"
//   },
//   {
//     "inputs": [],
//     "name": "NftSupplyChanged",
//     "type": "error"
//   },
//   {
//     "inputs": [],
//     "name": "NftSupplyDidntIncrease",
//     "type": "error"
//   },
//   {
//     "inputs": [],
//     "name": "NotApproved",
//     "type": "error"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "sender",
//         "type": "address"
//       }
//     ],
//     "name": "NotOwner",
//     "type": "error"
//   },
//   {
//     "inputs": [],
//     "name": "NotRegisteredSickle",
//     "type": "error"
//   },
//   {
//     "inputs": [],
//     "name": "PleaseUseIncrease",
//     "type": "error"
//   },
//   {
//     "inputs": [],
//     "name": "SickleNotDeployed",
//     "type": "error"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "contract Sickle",
//         "name": "sickle",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "contract INonfungiblePositionManager",
//         "name": "nft",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "uint256",
//         "name": "tokenId",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "address",
//         "name": "stakingContract",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "poolIndex",
//         "type": "uint256"
//       }
//     ],
//     "name": "SickleCompoundedNft",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "contract Sickle",
//         "name": "sickle",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "contract INonfungiblePositionManager",
//         "name": "nft",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "uint256",
//         "name": "tokenId",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "address",
//         "name": "stakingContract",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "poolIndex",
//         "type": "uint256"
//       }
//     ],
//     "name": "SickleDecreasedNft",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "contract Sickle",
//         "name": "sickle",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "contract INonfungiblePositionManager",
//         "name": "nft",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "uint256",
//         "name": "tokenId",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "address",
//         "name": "stakingContract",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "poolIndex",
//         "type": "uint256"
//       }
//     ],
//     "name": "SickleDepositedNft",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "contract Sickle",
//         "name": "sickle",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "contract INonfungiblePositionManager",
//         "name": "nft",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "uint256",
//         "name": "tokenId",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "address",
//         "name": "stakingContract",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "poolIndex",
//         "type": "uint256"
//       }
//     ],
//     "name": "SickleExitedNft",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "contract Sickle",
//         "name": "sickle",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "contract INonfungiblePositionManager",
//         "name": "nft",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "uint256",
//         "name": "tokenId",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "address",
//         "name": "stakingContract",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "poolIndex",
//         "type": "uint256"
//       }
//     ],
//     "name": "SickleHarvestedNft",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "contract Sickle",
//         "name": "sickle",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "contract INonfungiblePositionManager",
//         "name": "nft",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "uint256",
//         "name": "tokenId",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "address",
//         "name": "stakingContract",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "poolIndex",
//         "type": "uint256"
//       }
//     ],
//     "name": "SickleIncreasedNft",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "contract Sickle",
//         "name": "sickle",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "contract INonfungiblePositionManager",
//         "name": "fromNft",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "uint256",
//         "name": "fromTokenId",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "address",
//         "name": "fromStakingContract",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "fromPoolIndex",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "contract INonfungiblePositionManager",
//         "name": "toNft",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "toTokenId",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "address",
//         "name": "toStakingContract",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "toPoolIndex",
//         "type": "uint256"
//       }
//     ],
//     "name": "SickleMovedNft",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "contract Sickle",
//         "name": "sickle",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "contract INonfungiblePositionManager",
//         "name": "nft",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "uint256",
//         "name": "tokenId",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "address",
//         "name": "stakingContract",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "poolIndex",
//         "type": "uint256"
//       }
//     ],
//     "name": "SickleRebalancedNft",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "contract Sickle",
//         "name": "sickle",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "contract INonfungiblePositionManager",
//         "name": "nft",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "uint256",
//         "name": "tokenId",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "address",
//         "name": "stakingContract",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "poolIndex",
//         "type": "uint256"
//       }
//     ],
//     "name": "SickleWithdrewNft",
//     "type": "event"
//   },
//   {
//     "inputs": [
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "stakingContract",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "poolIndex",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct Farm",
//             "name": "farm",
//             "type": "tuple"
//           },
//           {
//             "internalType": "contract INonfungiblePositionManager",
//             "name": "nft",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "tokenId",
//             "type": "uint256"
//           }
//         ],
//         "internalType": "struct NftPosition",
//         "name": "position",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address[]",
//                 "name": "rewardTokens",
//                 "type": "address[]"
//               },
//               {
//                 "internalType": "uint128",
//                 "name": "amount0Max",
//                 "type": "uint128"
//               },
//               {
//                 "internalType": "uint128",
//                 "name": "amount1Max",
//                 "type": "uint128"
//               },
//               {
//                 "internalType": "bytes",
//                 "name": "extraData",
//                 "type": "bytes"
//               }
//             ],
//             "internalType": "struct SimpleNftHarvest",
//             "name": "harvest",
//             "type": "tuple"
//           },
//           {
//             "components": [
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "router",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amountIn",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "minAmountOut",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "tokenIn",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct SwapParams[]",
//                 "name": "swaps",
//                 "type": "tuple[]"
//               },
//               {
//                 "components": [
//                   {
//                     "internalType": "contract INonfungiblePositionManager",
//                     "name": "nft",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "tokenId",
//                     "type": "uint256"
//                   },
//                   {
//                     "components": [
//                       {
//                         "internalType": "address",
//                         "name": "token0",
//                         "type": "address"
//                       },
//                       {
//                         "internalType": "address",
//                         "name": "token1",
//                         "type": "address"
//                       },
//                       {
//                         "internalType": "uint24",
//                         "name": "fee",
//                         "type": "uint24"
//                       }
//                     ],
//                     "internalType": "struct Pool",
//                     "name": "pool",
//                     "type": "tuple"
//                   },
//                   {
//                     "internalType": "int24",
//                     "name": "tickLower",
//                     "type": "int24"
//                   },
//                   {
//                     "internalType": "int24",
//                     "name": "tickUpper",
//                     "type": "int24"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amount0Desired",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amount1Desired",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amount0Min",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amount1Min",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct NftAddLiquidity",
//                 "name": "addLiquidityParams",
//                 "type": "tuple"
//               }
//             ],
//             "internalType": "struct NftZapIn",
//             "name": "zap",
//             "type": "tuple"
//           }
//         ],
//         "internalType": "struct NftCompound",
//         "name": "params",
//         "type": "tuple"
//       },
//       {
//         "internalType": "bool",
//         "name": "inPlace",
//         "type": "bool"
//       },
//       {
//         "internalType": "address[]",
//         "name": "sweepTokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "compound",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "contract Sickle",
//         "name": "sickle",
//         "type": "address"
//       },
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "stakingContract",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "poolIndex",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct Farm",
//             "name": "farm",
//             "type": "tuple"
//           },
//           {
//             "internalType": "contract INonfungiblePositionManager",
//             "name": "nft",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "tokenId",
//             "type": "uint256"
//           }
//         ],
//         "internalType": "struct NftPosition",
//         "name": "position",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address[]",
//                 "name": "rewardTokens",
//                 "type": "address[]"
//               },
//               {
//                 "internalType": "uint128",
//                 "name": "amount0Max",
//                 "type": "uint128"
//               },
//               {
//                 "internalType": "uint128",
//                 "name": "amount1Max",
//                 "type": "uint128"
//               },
//               {
//                 "internalType": "bytes",
//                 "name": "extraData",
//                 "type": "bytes"
//               }
//             ],
//             "internalType": "struct SimpleNftHarvest",
//             "name": "harvest",
//             "type": "tuple"
//           },
//           {
//             "components": [
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "router",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amountIn",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "minAmountOut",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "tokenIn",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct SwapParams[]",
//                 "name": "swaps",
//                 "type": "tuple[]"
//               },
//               {
//                 "components": [
//                   {
//                     "internalType": "contract INonfungiblePositionManager",
//                     "name": "nft",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "tokenId",
//                     "type": "uint256"
//                   },
//                   {
//                     "components": [
//                       {
//                         "internalType": "address",
//                         "name": "token0",
//                         "type": "address"
//                       },
//                       {
//                         "internalType": "address",
//                         "name": "token1",
//                         "type": "address"
//                       },
//                       {
//                         "internalType": "uint24",
//                         "name": "fee",
//                         "type": "uint24"
//                       }
//                     ],
//                     "internalType": "struct Pool",
//                     "name": "pool",
//                     "type": "tuple"
//                   },
//                   {
//                     "internalType": "int24",
//                     "name": "tickLower",
//                     "type": "int24"
//                   },
//                   {
//                     "internalType": "int24",
//                     "name": "tickUpper",
//                     "type": "int24"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amount0Desired",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amount1Desired",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amount0Min",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amount1Min",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct NftAddLiquidity",
//                 "name": "addLiquidityParams",
//                 "type": "tuple"
//               }
//             ],
//             "internalType": "struct NftZapIn",
//             "name": "zap",
//             "type": "tuple"
//           }
//         ],
//         "internalType": "struct NftCompound",
//         "name": "params",
//         "type": "tuple"
//       },
//       {
//         "internalType": "bool",
//         "name": "inPlace",
//         "type": "bool"
//       },
//       {
//         "internalType": "address[]",
//         "name": "sweepTokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "compoundFor",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "connectorRegistry",
//     "outputs": [
//       {
//         "internalType": "contract ConnectorRegistry",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "stakingContract",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "poolIndex",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct Farm",
//             "name": "farm",
//             "type": "tuple"
//           },
//           {
//             "internalType": "contract INonfungiblePositionManager",
//             "name": "nft",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "tokenId",
//             "type": "uint256"
//           }
//         ],
//         "internalType": "struct NftPosition",
//         "name": "position",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address[]",
//                 "name": "rewardTokens",
//                 "type": "address[]"
//               },
//               {
//                 "internalType": "uint128",
//                 "name": "amount0Max",
//                 "type": "uint128"
//               },
//               {
//                 "internalType": "uint128",
//                 "name": "amount1Max",
//                 "type": "uint128"
//               },
//               {
//                 "internalType": "bytes",
//                 "name": "extraData",
//                 "type": "bytes"
//               }
//             ],
//             "internalType": "struct SimpleNftHarvest",
//             "name": "harvest",
//             "type": "tuple"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "router",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "amountIn",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "minAmountOut",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "address",
//                 "name": "tokenIn",
//                 "type": "address"
//               },
//               {
//                 "internalType": "bytes",
//                 "name": "extraData",
//                 "type": "bytes"
//               }
//             ],
//             "internalType": "struct SwapParams[]",
//             "name": "swaps",
//             "type": "tuple[]"
//           },
//           {
//             "internalType": "address[]",
//             "name": "outputTokens",
//             "type": "address[]"
//           }
//         ],
//         "internalType": "struct NftHarvest",
//         "name": "harvestParams",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "components": [
//                   {
//                     "internalType": "contract INonfungiblePositionManager",
//                     "name": "nft",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "tokenId",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint128",
//                     "name": "liquidity",
//                     "type": "uint128"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amount0Min",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amount1Min",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint128",
//                     "name": "amount0Max",
//                     "type": "uint128"
//                   },
//                   {
//                     "internalType": "uint128",
//                     "name": "amount1Max",
//                     "type": "uint128"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct NftRemoveLiquidity",
//                 "name": "removeLiquidityParams",
//                 "type": "tuple"
//               },
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "router",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amountIn",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "minAmountOut",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "tokenIn",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct SwapParams[]",
//                 "name": "swaps",
//                 "type": "tuple[]"
//               }
//             ],
//             "internalType": "struct NftZapOut",
//             "name": "zap",
//             "type": "tuple"
//           },
//           {
//             "internalType": "address[]",
//             "name": "tokensOut",
//             "type": "address[]"
//           },
//           {
//             "internalType": "bytes",
//             "name": "extraData",
//             "type": "bytes"
//           }
//         ],
//         "internalType": "struct NftWithdraw",
//         "name": "withdrawParams",
//         "type": "tuple"
//       },
//       {
//         "internalType": "bool",
//         "name": "inPlace",
//         "type": "bool"
//       },
//       {
//         "internalType": "address[]",
//         "name": "sweepTokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "decrease",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "stakingContract",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "poolIndex",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct Farm",
//             "name": "farm",
//             "type": "tuple"
//           },
//           {
//             "internalType": "contract INonfungiblePositionManager",
//             "name": "nft",
//             "type": "address"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "address[]",
//                 "name": "tokensIn",
//                 "type": "address[]"
//               },
//               {
//                 "internalType": "uint256[]",
//                 "name": "amountsIn",
//                 "type": "uint256[]"
//               },
//               {
//                 "components": [
//                   {
//                     "components": [
//                       {
//                         "internalType": "address",
//                         "name": "router",
//                         "type": "address"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "amountIn",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "minAmountOut",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "address",
//                         "name": "tokenIn",
//                         "type": "address"
//                       },
//                       {
//                         "internalType": "bytes",
//                         "name": "extraData",
//                         "type": "bytes"
//                       }
//                     ],
//                     "internalType": "struct SwapParams[]",
//                     "name": "swaps",
//                     "type": "tuple[]"
//                   },
//                   {
//                     "components": [
//                       {
//                         "internalType": "contract INonfungiblePositionManager",
//                         "name": "nft",
//                         "type": "address"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "tokenId",
//                         "type": "uint256"
//                       },
//                       {
//                         "components": [
//                           {
//                             "internalType": "address",
//                             "name": "token0",
//                             "type": "address"
//                           },
//                           {
//                             "internalType": "address",
//                             "name": "token1",
//                             "type": "address"
//                           },
//                           {
//                             "internalType": "uint24",
//                             "name": "fee",
//                             "type": "uint24"
//                           }
//                         ],
//                         "internalType": "struct Pool",
//                         "name": "pool",
//                         "type": "tuple"
//                       },
//                       {
//                         "internalType": "int24",
//                         "name": "tickLower",
//                         "type": "int24"
//                       },
//                       {
//                         "internalType": "int24",
//                         "name": "tickUpper",
//                         "type": "int24"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "amount0Desired",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "amount1Desired",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "amount0Min",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "amount1Min",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "bytes",
//                         "name": "extraData",
//                         "type": "bytes"
//                       }
//                     ],
//                     "internalType": "struct NftAddLiquidity",
//                     "name": "addLiquidityParams",
//                     "type": "tuple"
//                   }
//                 ],
//                 "internalType": "struct NftZapIn",
//                 "name": "zap",
//                 "type": "tuple"
//               },
//               {
//                 "internalType": "bytes",
//                 "name": "extraData",
//                 "type": "bytes"
//               }
//             ],
//             "internalType": "struct NftIncrease",
//             "name": "increase",
//             "type": "tuple"
//           }
//         ],
//         "internalType": "struct NftDeposit",
//         "name": "params",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "internalType": "contract IUniswapV3Pool",
//             "name": "pool",
//             "type": "address"
//           },
//           {
//             "internalType": "bool",
//             "name": "autoRebalance",
//             "type": "bool"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "uint24",
//                 "name": "tickSpacesBelow",
//                 "type": "uint24"
//               },
//               {
//                 "internalType": "uint24",
//                 "name": "tickSpacesAbove",
//                 "type": "uint24"
//               },
//               {
//                 "internalType": "int24",
//                 "name": "bufferTicksBelow",
//                 "type": "int24"
//               },
//               {
//                 "internalType": "int24",
//                 "name": "bufferTicksAbove",
//                 "type": "int24"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "dustBP",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "priceImpactBP",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "slippageBP",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "int24",
//                 "name": "cutoffTickLow",
//                 "type": "int24"
//               },
//               {
//                 "internalType": "int24",
//                 "name": "cutoffTickHigh",
//                 "type": "int24"
//               },
//               {
//                 "internalType": "uint8",
//                 "name": "delayMin",
//                 "type": "uint8"
//               },
//               {
//                 "components": [
//                   {
//                     "internalType": "enum RewardBehavior",
//                     "name": "rewardBehavior",
//                     "type": "uint8"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "harvestTokenOut",
//                     "type": "address"
//                   }
//                 ],
//                 "internalType": "struct RewardConfig",
//                 "name": "rewardConfig",
//                 "type": "tuple"
//               }
//             ],
//             "internalType": "struct RebalanceConfig",
//             "name": "rebalanceConfig",
//             "type": "tuple"
//           },
//           {
//             "internalType": "bool",
//             "name": "automateRewards",
//             "type": "bool"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "enum RewardBehavior",
//                 "name": "rewardBehavior",
//                 "type": "uint8"
//               },
//               {
//                 "internalType": "address",
//                 "name": "harvestTokenOut",
//                 "type": "address"
//               }
//             ],
//             "internalType": "struct RewardConfig",
//             "name": "rewardConfig",
//             "type": "tuple"
//           },
//           {
//             "internalType": "bool",
//             "name": "autoExit",
//             "type": "bool"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "int24",
//                 "name": "triggerTickLow",
//                 "type": "int24"
//               },
//               {
//                 "internalType": "int24",
//                 "name": "triggerTickHigh",
//                 "type": "int24"
//               },
//               {
//                 "internalType": "address",
//                 "name": "exitTokenOutLow",
//                 "type": "address"
//               },
//               {
//                 "internalType": "address",
//                 "name": "exitTokenOutHigh",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "priceImpactBP",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "slippageBP",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct ExitConfig",
//             "name": "exitConfig",
//             "type": "tuple"
//           }
//         ],
//         "internalType": "struct NftSettings",
//         "name": "settings",
//         "type": "tuple"
//       },
//       {
//         "internalType": "address[]",
//         "name": "sweepTokens",
//         "type": "address[]"
//       },
//       {
//         "internalType": "address",
//         "name": "approved",
//         "type": "address"
//       },
//       {
//         "internalType": "bytes32",
//         "name": "referralCode",
//         "type": "bytes32"
//       }
//     ],
//     "name": "deposit",
//     "outputs": [],
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "stakingContract",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "poolIndex",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct Farm",
//             "name": "farm",
//             "type": "tuple"
//           },
//           {
//             "internalType": "contract INonfungiblePositionManager",
//             "name": "nft",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "tokenId",
//             "type": "uint256"
//           }
//         ],
//         "internalType": "struct NftPosition",
//         "name": "position",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address[]",
//                 "name": "rewardTokens",
//                 "type": "address[]"
//               },
//               {
//                 "internalType": "uint128",
//                 "name": "amount0Max",
//                 "type": "uint128"
//               },
//               {
//                 "internalType": "uint128",
//                 "name": "amount1Max",
//                 "type": "uint128"
//               },
//               {
//                 "internalType": "bytes",
//                 "name": "extraData",
//                 "type": "bytes"
//               }
//             ],
//             "internalType": "struct SimpleNftHarvest",
//             "name": "harvest",
//             "type": "tuple"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "router",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "amountIn",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "minAmountOut",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "address",
//                 "name": "tokenIn",
//                 "type": "address"
//               },
//               {
//                 "internalType": "bytes",
//                 "name": "extraData",
//                 "type": "bytes"
//               }
//             ],
//             "internalType": "struct SwapParams[]",
//             "name": "swaps",
//             "type": "tuple[]"
//           },
//           {
//             "internalType": "address[]",
//             "name": "outputTokens",
//             "type": "address[]"
//           }
//         ],
//         "internalType": "struct NftHarvest",
//         "name": "harvestParams",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "components": [
//                   {
//                     "internalType": "contract INonfungiblePositionManager",
//                     "name": "nft",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "tokenId",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint128",
//                     "name": "liquidity",
//                     "type": "uint128"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amount0Min",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amount1Min",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint128",
//                     "name": "amount0Max",
//                     "type": "uint128"
//                   },
//                   {
//                     "internalType": "uint128",
//                     "name": "amount1Max",
//                     "type": "uint128"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct NftRemoveLiquidity",
//                 "name": "removeLiquidityParams",
//                 "type": "tuple"
//               },
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "router",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amountIn",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "minAmountOut",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "tokenIn",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct SwapParams[]",
//                 "name": "swaps",
//                 "type": "tuple[]"
//               }
//             ],
//             "internalType": "struct NftZapOut",
//             "name": "zap",
//             "type": "tuple"
//           },
//           {
//             "internalType": "address[]",
//             "name": "tokensOut",
//             "type": "address[]"
//           },
//           {
//             "internalType": "bytes",
//             "name": "extraData",
//             "type": "bytes"
//           }
//         ],
//         "internalType": "struct NftWithdraw",
//         "name": "withdrawParams",
//         "type": "tuple"
//       },
//       {
//         "internalType": "address[]",
//         "name": "sweepTokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "exit",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "contract Sickle",
//         "name": "sickle",
//         "type": "address"
//       },
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "stakingContract",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "poolIndex",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct Farm",
//             "name": "farm",
//             "type": "tuple"
//           },
//           {
//             "internalType": "contract INonfungiblePositionManager",
//             "name": "nft",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "tokenId",
//             "type": "uint256"
//           }
//         ],
//         "internalType": "struct NftPosition",
//         "name": "position",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address[]",
//                 "name": "rewardTokens",
//                 "type": "address[]"
//               },
//               {
//                 "internalType": "uint128",
//                 "name": "amount0Max",
//                 "type": "uint128"
//               },
//               {
//                 "internalType": "uint128",
//                 "name": "amount1Max",
//                 "type": "uint128"
//               },
//               {
//                 "internalType": "bytes",
//                 "name": "extraData",
//                 "type": "bytes"
//               }
//             ],
//             "internalType": "struct SimpleNftHarvest",
//             "name": "harvest",
//             "type": "tuple"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "router",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "amountIn",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "minAmountOut",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "address",
//                 "name": "tokenIn",
//                 "type": "address"
//               },
//               {
//                 "internalType": "bytes",
//                 "name": "extraData",
//                 "type": "bytes"
//               }
//             ],
//             "internalType": "struct SwapParams[]",
//             "name": "swaps",
//             "type": "tuple[]"
//           },
//           {
//             "internalType": "address[]",
//             "name": "outputTokens",
//             "type": "address[]"
//           }
//         ],
//         "internalType": "struct NftHarvest",
//         "name": "harvestParams",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "components": [
//                   {
//                     "internalType": "contract INonfungiblePositionManager",
//                     "name": "nft",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "tokenId",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint128",
//                     "name": "liquidity",
//                     "type": "uint128"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amount0Min",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amount1Min",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint128",
//                     "name": "amount0Max",
//                     "type": "uint128"
//                   },
//                   {
//                     "internalType": "uint128",
//                     "name": "amount1Max",
//                     "type": "uint128"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct NftRemoveLiquidity",
//                 "name": "removeLiquidityParams",
//                 "type": "tuple"
//               },
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "router",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amountIn",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "minAmountOut",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "tokenIn",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct SwapParams[]",
//                 "name": "swaps",
//                 "type": "tuple[]"
//               }
//             ],
//             "internalType": "struct NftZapOut",
//             "name": "zap",
//             "type": "tuple"
//           },
//           {
//             "internalType": "address[]",
//             "name": "tokensOut",
//             "type": "address[]"
//           },
//           {
//             "internalType": "bytes",
//             "name": "extraData",
//             "type": "bytes"
//           }
//         ],
//         "internalType": "struct NftWithdraw",
//         "name": "withdrawParams",
//         "type": "tuple"
//       },
//       {
//         "internalType": "address[]",
//         "name": "sweepTokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "exitFor",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "factory",
//     "outputs": [
//       {
//         "internalType": "contract SickleFactory",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "feesLib",
//     "outputs": [
//       {
//         "internalType": "contract IFeesLib",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "owner",
//         "type": "address"
//       },
//       {
//         "internalType": "address",
//         "name": "approved",
//         "type": "address"
//       },
//       {
//         "internalType": "bytes32",
//         "name": "referralCode",
//         "type": "bytes32"
//       }
//     ],
//     "name": "getOrDeploySickle",
//     "outputs": [
//       {
//         "internalType": "contract Sickle",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "owner",
//         "type": "address"
//       }
//     ],
//     "name": "getSickle",
//     "outputs": [
//       {
//         "internalType": "contract Sickle",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "stakingContract",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "poolIndex",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct Farm",
//             "name": "farm",
//             "type": "tuple"
//           },
//           {
//             "internalType": "contract INonfungiblePositionManager",
//             "name": "nft",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "tokenId",
//             "type": "uint256"
//           }
//         ],
//         "internalType": "struct NftPosition",
//         "name": "position",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address[]",
//                 "name": "rewardTokens",
//                 "type": "address[]"
//               },
//               {
//                 "internalType": "uint128",
//                 "name": "amount0Max",
//                 "type": "uint128"
//               },
//               {
//                 "internalType": "uint128",
//                 "name": "amount1Max",
//                 "type": "uint128"
//               },
//               {
//                 "internalType": "bytes",
//                 "name": "extraData",
//                 "type": "bytes"
//               }
//             ],
//             "internalType": "struct SimpleNftHarvest",
//             "name": "harvest",
//             "type": "tuple"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "router",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "amountIn",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "minAmountOut",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "address",
//                 "name": "tokenIn",
//                 "type": "address"
//               },
//               {
//                 "internalType": "bytes",
//                 "name": "extraData",
//                 "type": "bytes"
//               }
//             ],
//             "internalType": "struct SwapParams[]",
//             "name": "swaps",
//             "type": "tuple[]"
//           },
//           {
//             "internalType": "address[]",
//             "name": "outputTokens",
//             "type": "address[]"
//           }
//         ],
//         "internalType": "struct NftHarvest",
//         "name": "params",
//         "type": "tuple"
//       }
//     ],
//     "name": "harvest",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "contract Sickle",
//         "name": "sickle",
//         "type": "address"
//       },
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "stakingContract",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "poolIndex",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct Farm",
//             "name": "farm",
//             "type": "tuple"
//           },
//           {
//             "internalType": "contract INonfungiblePositionManager",
//             "name": "nft",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "tokenId",
//             "type": "uint256"
//           }
//         ],
//         "internalType": "struct NftPosition",
//         "name": "position",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address[]",
//                 "name": "rewardTokens",
//                 "type": "address[]"
//               },
//               {
//                 "internalType": "uint128",
//                 "name": "amount0Max",
//                 "type": "uint128"
//               },
//               {
//                 "internalType": "uint128",
//                 "name": "amount1Max",
//                 "type": "uint128"
//               },
//               {
//                 "internalType": "bytes",
//                 "name": "extraData",
//                 "type": "bytes"
//               }
//             ],
//             "internalType": "struct SimpleNftHarvest",
//             "name": "harvest",
//             "type": "tuple"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "router",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "amountIn",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "minAmountOut",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "address",
//                 "name": "tokenIn",
//                 "type": "address"
//               },
//               {
//                 "internalType": "bytes",
//                 "name": "extraData",
//                 "type": "bytes"
//               }
//             ],
//             "internalType": "struct SwapParams[]",
//             "name": "swaps",
//             "type": "tuple[]"
//           },
//           {
//             "internalType": "address[]",
//             "name": "outputTokens",
//             "type": "address[]"
//           }
//         ],
//         "internalType": "struct NftHarvest",
//         "name": "params",
//         "type": "tuple"
//       }
//     ],
//     "name": "harvestFor",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "stakingContract",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "poolIndex",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct Farm",
//             "name": "farm",
//             "type": "tuple"
//           },
//           {
//             "internalType": "contract INonfungiblePositionManager",
//             "name": "nft",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "tokenId",
//             "type": "uint256"
//           }
//         ],
//         "internalType": "struct NftPosition",
//         "name": "position",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address[]",
//                 "name": "rewardTokens",
//                 "type": "address[]"
//               },
//               {
//                 "internalType": "uint128",
//                 "name": "amount0Max",
//                 "type": "uint128"
//               },
//               {
//                 "internalType": "uint128",
//                 "name": "amount1Max",
//                 "type": "uint128"
//               },
//               {
//                 "internalType": "bytes",
//                 "name": "extraData",
//                 "type": "bytes"
//               }
//             ],
//             "internalType": "struct SimpleNftHarvest",
//             "name": "harvest",
//             "type": "tuple"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "router",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "amountIn",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "minAmountOut",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "address",
//                 "name": "tokenIn",
//                 "type": "address"
//               },
//               {
//                 "internalType": "bytes",
//                 "name": "extraData",
//                 "type": "bytes"
//               }
//             ],
//             "internalType": "struct SwapParams[]",
//             "name": "swaps",
//             "type": "tuple[]"
//           },
//           {
//             "internalType": "address[]",
//             "name": "outputTokens",
//             "type": "address[]"
//           }
//         ],
//         "internalType": "struct NftHarvest",
//         "name": "harvestParams",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "internalType": "address[]",
//             "name": "tokensIn",
//             "type": "address[]"
//           },
//           {
//             "internalType": "uint256[]",
//             "name": "amountsIn",
//             "type": "uint256[]"
//           },
//           {
//             "components": [
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "router",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amountIn",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "minAmountOut",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "tokenIn",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct SwapParams[]",
//                 "name": "swaps",
//                 "type": "tuple[]"
//               },
//               {
//                 "components": [
//                   {
//                     "internalType": "contract INonfungiblePositionManager",
//                     "name": "nft",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "tokenId",
//                     "type": "uint256"
//                   },
//                   {
//                     "components": [
//                       {
//                         "internalType": "address",
//                         "name": "token0",
//                         "type": "address"
//                       },
//                       {
//                         "internalType": "address",
//                         "name": "token1",
//                         "type": "address"
//                       },
//                       {
//                         "internalType": "uint24",
//                         "name": "fee",
//                         "type": "uint24"
//                       }
//                     ],
//                     "internalType": "struct Pool",
//                     "name": "pool",
//                     "type": "tuple"
//                   },
//                   {
//                     "internalType": "int24",
//                     "name": "tickLower",
//                     "type": "int24"
//                   },
//                   {
//                     "internalType": "int24",
//                     "name": "tickUpper",
//                     "type": "int24"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amount0Desired",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amount1Desired",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amount0Min",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amount1Min",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct NftAddLiquidity",
//                 "name": "addLiquidityParams",
//                 "type": "tuple"
//               }
//             ],
//             "internalType": "struct NftZapIn",
//             "name": "zap",
//             "type": "tuple"
//           },
//           {
//             "internalType": "bytes",
//             "name": "extraData",
//             "type": "bytes"
//           }
//         ],
//         "internalType": "struct NftIncrease",
//         "name": "increaseParams",
//         "type": "tuple"
//       },
//       {
//         "internalType": "bool",
//         "name": "inPlace",
//         "type": "bool"
//       },
//       {
//         "internalType": "address[]",
//         "name": "sweepTokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "increase",
//     "outputs": [],
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "components": [
//           {
//             "internalType": "contract IUniswapV3Pool",
//             "name": "pool",
//             "type": "address"
//           },
//           {
//             "components": [
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "stakingContract",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "poolIndex",
//                     "type": "uint256"
//                   }
//                 ],
//                 "internalType": "struct Farm",
//                 "name": "farm",
//                 "type": "tuple"
//               },
//               {
//                 "internalType": "contract INonfungiblePositionManager",
//                 "name": "nft",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "tokenId",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct NftPosition",
//             "name": "position",
//             "type": "tuple"
//           },
//           {
//             "components": [
//               {
//                 "components": [
//                   {
//                     "internalType": "address[]",
//                     "name": "rewardTokens",
//                     "type": "address[]"
//                   },
//                   {
//                     "internalType": "uint128",
//                     "name": "amount0Max",
//                     "type": "uint128"
//                   },
//                   {
//                     "internalType": "uint128",
//                     "name": "amount1Max",
//                     "type": "uint128"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct SimpleNftHarvest",
//                 "name": "harvest",
//                 "type": "tuple"
//               },
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "router",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amountIn",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "minAmountOut",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "tokenIn",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct SwapParams[]",
//                 "name": "swaps",
//                 "type": "tuple[]"
//               },
//               {
//                 "internalType": "address[]",
//                 "name": "outputTokens",
//                 "type": "address[]"
//               }
//             ],
//             "internalType": "struct NftHarvest",
//             "name": "harvest",
//             "type": "tuple"
//           },
//           {
//             "components": [
//               {
//                 "components": [
//                   {
//                     "components": [
//                       {
//                         "internalType": "contract INonfungiblePositionManager",
//                         "name": "nft",
//                         "type": "address"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "tokenId",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "uint128",
//                         "name": "liquidity",
//                         "type": "uint128"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "amount0Min",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "amount1Min",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "uint128",
//                         "name": "amount0Max",
//                         "type": "uint128"
//                       },
//                       {
//                         "internalType": "uint128",
//                         "name": "amount1Max",
//                         "type": "uint128"
//                       },
//                       {
//                         "internalType": "bytes",
//                         "name": "extraData",
//                         "type": "bytes"
//                       }
//                     ],
//                     "internalType": "struct NftRemoveLiquidity",
//                     "name": "removeLiquidityParams",
//                     "type": "tuple"
//                   },
//                   {
//                     "components": [
//                       {
//                         "internalType": "address",
//                         "name": "router",
//                         "type": "address"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "amountIn",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "minAmountOut",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "address",
//                         "name": "tokenIn",
//                         "type": "address"
//                       },
//                       {
//                         "internalType": "bytes",
//                         "name": "extraData",
//                         "type": "bytes"
//                       }
//                     ],
//                     "internalType": "struct SwapParams[]",
//                     "name": "swaps",
//                     "type": "tuple[]"
//                   }
//                 ],
//                 "internalType": "struct NftZapOut",
//                 "name": "zap",
//                 "type": "tuple"
//               },
//               {
//                 "internalType": "address[]",
//                 "name": "tokensOut",
//                 "type": "address[]"
//               },
//               {
//                 "internalType": "bytes",
//                 "name": "extraData",
//                 "type": "bytes"
//               }
//             ],
//             "internalType": "struct NftWithdraw",
//             "name": "withdraw",
//             "type": "tuple"
//           },
//           {
//             "components": [
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "stakingContract",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "poolIndex",
//                     "type": "uint256"
//                   }
//                 ],
//                 "internalType": "struct Farm",
//                 "name": "farm",
//                 "type": "tuple"
//               },
//               {
//                 "internalType": "contract INonfungiblePositionManager",
//                 "name": "nft",
//                 "type": "address"
//               },
//               {
//                 "components": [
//                   {
//                     "internalType": "address[]",
//                     "name": "tokensIn",
//                     "type": "address[]"
//                   },
//                   {
//                     "internalType": "uint256[]",
//                     "name": "amountsIn",
//                     "type": "uint256[]"
//                   },
//                   {
//                     "components": [
//                       {
//                         "components": [
//                           {
//                             "internalType": "address",
//                             "name": "router",
//                             "type": "address"
//                           },
//                           {
//                             "internalType": "uint256",
//                             "name": "amountIn",
//                             "type": "uint256"
//                           },
//                           {
//                             "internalType": "uint256",
//                             "name": "minAmountOut",
//                             "type": "uint256"
//                           },
//                           {
//                             "internalType": "address",
//                             "name": "tokenIn",
//                             "type": "address"
//                           },
//                           {
//                             "internalType": "bytes",
//                             "name": "extraData",
//                             "type": "bytes"
//                           }
//                         ],
//                         "internalType": "struct SwapParams[]",
//                         "name": "swaps",
//                         "type": "tuple[]"
//                       },
//                       {
//                         "components": [
//                           {
//                             "internalType": "contract INonfungiblePositionManager",
//                             "name": "nft",
//                             "type": "address"
//                           },
//                           {
//                             "internalType": "uint256",
//                             "name": "tokenId",
//                             "type": "uint256"
//                           },
//                           {
//                             "components": [
//                               {
//                                 "internalType": "address",
//                                 "name": "token0",
//                                 "type": "address"
//                               },
//                               {
//                                 "internalType": "address",
//                                 "name": "token1",
//                                 "type": "address"
//                               },
//                               {
//                                 "internalType": "uint24",
//                                 "name": "fee",
//                                 "type": "uint24"
//                               }
//                             ],
//                             "internalType": "struct Pool",
//                             "name": "pool",
//                             "type": "tuple"
//                           },
//                           {
//                             "internalType": "int24",
//                             "name": "tickLower",
//                             "type": "int24"
//                           },
//                           {
//                             "internalType": "int24",
//                             "name": "tickUpper",
//                             "type": "int24"
//                           },
//                           {
//                             "internalType": "uint256",
//                             "name": "amount0Desired",
//                             "type": "uint256"
//                           },
//                           {
//                             "internalType": "uint256",
//                             "name": "amount1Desired",
//                             "type": "uint256"
//                           },
//                           {
//                             "internalType": "uint256",
//                             "name": "amount0Min",
//                             "type": "uint256"
//                           },
//                           {
//                             "internalType": "uint256",
//                             "name": "amount1Min",
//                             "type": "uint256"
//                           },
//                           {
//                             "internalType": "bytes",
//                             "name": "extraData",
//                             "type": "bytes"
//                           }
//                         ],
//                         "internalType": "struct NftAddLiquidity",
//                         "name": "addLiquidityParams",
//                         "type": "tuple"
//                       }
//                     ],
//                     "internalType": "struct NftZapIn",
//                     "name": "zap",
//                     "type": "tuple"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct NftIncrease",
//                 "name": "increase",
//                 "type": "tuple"
//               }
//             ],
//             "internalType": "struct NftDeposit",
//             "name": "deposit",
//             "type": "tuple"
//           }
//         ],
//         "internalType": "struct NftMove",
//         "name": "params",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "internalType": "contract IUniswapV3Pool",
//             "name": "pool",
//             "type": "address"
//           },
//           {
//             "internalType": "bool",
//             "name": "autoRebalance",
//             "type": "bool"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "uint24",
//                 "name": "tickSpacesBelow",
//                 "type": "uint24"
//               },
//               {
//                 "internalType": "uint24",
//                 "name": "tickSpacesAbove",
//                 "type": "uint24"
//               },
//               {
//                 "internalType": "int24",
//                 "name": "bufferTicksBelow",
//                 "type": "int24"
//               },
//               {
//                 "internalType": "int24",
//                 "name": "bufferTicksAbove",
//                 "type": "int24"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "dustBP",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "priceImpactBP",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "slippageBP",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "int24",
//                 "name": "cutoffTickLow",
//                 "type": "int24"
//               },
//               {
//                 "internalType": "int24",
//                 "name": "cutoffTickHigh",
//                 "type": "int24"
//               },
//               {
//                 "internalType": "uint8",
//                 "name": "delayMin",
//                 "type": "uint8"
//               },
//               {
//                 "components": [
//                   {
//                     "internalType": "enum RewardBehavior",
//                     "name": "rewardBehavior",
//                     "type": "uint8"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "harvestTokenOut",
//                     "type": "address"
//                   }
//                 ],
//                 "internalType": "struct RewardConfig",
//                 "name": "rewardConfig",
//                 "type": "tuple"
//               }
//             ],
//             "internalType": "struct RebalanceConfig",
//             "name": "rebalanceConfig",
//             "type": "tuple"
//           },
//           {
//             "internalType": "bool",
//             "name": "automateRewards",
//             "type": "bool"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "enum RewardBehavior",
//                 "name": "rewardBehavior",
//                 "type": "uint8"
//               },
//               {
//                 "internalType": "address",
//                 "name": "harvestTokenOut",
//                 "type": "address"
//               }
//             ],
//             "internalType": "struct RewardConfig",
//             "name": "rewardConfig",
//             "type": "tuple"
//           },
//           {
//             "internalType": "bool",
//             "name": "autoExit",
//             "type": "bool"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "int24",
//                 "name": "triggerTickLow",
//                 "type": "int24"
//               },
//               {
//                 "internalType": "int24",
//                 "name": "triggerTickHigh",
//                 "type": "int24"
//               },
//               {
//                 "internalType": "address",
//                 "name": "exitTokenOutLow",
//                 "type": "address"
//               },
//               {
//                 "internalType": "address",
//                 "name": "exitTokenOutHigh",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "priceImpactBP",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "slippageBP",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct ExitConfig",
//             "name": "exitConfig",
//             "type": "tuple"
//           }
//         ],
//         "internalType": "struct NftSettings",
//         "name": "settings",
//         "type": "tuple"
//       },
//       {
//         "internalType": "address[]",
//         "name": "sweepTokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "move",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "nftSettingsLib",
//     "outputs": [
//       {
//         "internalType": "contract INftSettingsLib",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "nftSettingsRegistry",
//     "outputs": [
//       {
//         "internalType": "contract INftSettingsRegistry",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "nftTransferLib",
//     "outputs": [
//       {
//         "internalType": "contract INftTransferLib",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "nftZapLib",
//     "outputs": [
//       {
//         "internalType": "contract INftZapLib",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "components": [
//           {
//             "internalType": "contract IUniswapV3Pool",
//             "name": "pool",
//             "type": "address"
//           },
//           {
//             "components": [
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "stakingContract",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "poolIndex",
//                     "type": "uint256"
//                   }
//                 ],
//                 "internalType": "struct Farm",
//                 "name": "farm",
//                 "type": "tuple"
//               },
//               {
//                 "internalType": "contract INonfungiblePositionManager",
//                 "name": "nft",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "tokenId",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct NftPosition",
//             "name": "position",
//             "type": "tuple"
//           },
//           {
//             "components": [
//               {
//                 "components": [
//                   {
//                     "internalType": "address[]",
//                     "name": "rewardTokens",
//                     "type": "address[]"
//                   },
//                   {
//                     "internalType": "uint128",
//                     "name": "amount0Max",
//                     "type": "uint128"
//                   },
//                   {
//                     "internalType": "uint128",
//                     "name": "amount1Max",
//                     "type": "uint128"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct SimpleNftHarvest",
//                 "name": "harvest",
//                 "type": "tuple"
//               },
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "router",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amountIn",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "minAmountOut",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "tokenIn",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct SwapParams[]",
//                 "name": "swaps",
//                 "type": "tuple[]"
//               },
//               {
//                 "internalType": "address[]",
//                 "name": "outputTokens",
//                 "type": "address[]"
//               }
//             ],
//             "internalType": "struct NftHarvest",
//             "name": "harvest",
//             "type": "tuple"
//           },
//           {
//             "components": [
//               {
//                 "components": [
//                   {
//                     "components": [
//                       {
//                         "internalType": "contract INonfungiblePositionManager",
//                         "name": "nft",
//                         "type": "address"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "tokenId",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "uint128",
//                         "name": "liquidity",
//                         "type": "uint128"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "amount0Min",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "amount1Min",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "uint128",
//                         "name": "amount0Max",
//                         "type": "uint128"
//                       },
//                       {
//                         "internalType": "uint128",
//                         "name": "amount1Max",
//                         "type": "uint128"
//                       },
//                       {
//                         "internalType": "bytes",
//                         "name": "extraData",
//                         "type": "bytes"
//                       }
//                     ],
//                     "internalType": "struct NftRemoveLiquidity",
//                     "name": "removeLiquidityParams",
//                     "type": "tuple"
//                   },
//                   {
//                     "components": [
//                       {
//                         "internalType": "address",
//                         "name": "router",
//                         "type": "address"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "amountIn",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "minAmountOut",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "address",
//                         "name": "tokenIn",
//                         "type": "address"
//                       },
//                       {
//                         "internalType": "bytes",
//                         "name": "extraData",
//                         "type": "bytes"
//                       }
//                     ],
//                     "internalType": "struct SwapParams[]",
//                     "name": "swaps",
//                     "type": "tuple[]"
//                   }
//                 ],
//                 "internalType": "struct NftZapOut",
//                 "name": "zap",
//                 "type": "tuple"
//               },
//               {
//                 "internalType": "address[]",
//                 "name": "tokensOut",
//                 "type": "address[]"
//               },
//               {
//                 "internalType": "bytes",
//                 "name": "extraData",
//                 "type": "bytes"
//               }
//             ],
//             "internalType": "struct NftWithdraw",
//             "name": "withdraw",
//             "type": "tuple"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "address[]",
//                 "name": "tokensIn",
//                 "type": "address[]"
//               },
//               {
//                 "internalType": "uint256[]",
//                 "name": "amountsIn",
//                 "type": "uint256[]"
//               },
//               {
//                 "components": [
//                   {
//                     "components": [
//                       {
//                         "internalType": "address",
//                         "name": "router",
//                         "type": "address"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "amountIn",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "minAmountOut",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "address",
//                         "name": "tokenIn",
//                         "type": "address"
//                       },
//                       {
//                         "internalType": "bytes",
//                         "name": "extraData",
//                         "type": "bytes"
//                       }
//                     ],
//                     "internalType": "struct SwapParams[]",
//                     "name": "swaps",
//                     "type": "tuple[]"
//                   },
//                   {
//                     "components": [
//                       {
//                         "internalType": "contract INonfungiblePositionManager",
//                         "name": "nft",
//                         "type": "address"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "tokenId",
//                         "type": "uint256"
//                       },
//                       {
//                         "components": [
//                           {
//                             "internalType": "address",
//                             "name": "token0",
//                             "type": "address"
//                           },
//                           {
//                             "internalType": "address",
//                             "name": "token1",
//                             "type": "address"
//                           },
//                           {
//                             "internalType": "uint24",
//                             "name": "fee",
//                             "type": "uint24"
//                           }
//                         ],
//                         "internalType": "struct Pool",
//                         "name": "pool",
//                         "type": "tuple"
//                       },
//                       {
//                         "internalType": "int24",
//                         "name": "tickLower",
//                         "type": "int24"
//                       },
//                       {
//                         "internalType": "int24",
//                         "name": "tickUpper",
//                         "type": "int24"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "amount0Desired",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "amount1Desired",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "amount0Min",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "amount1Min",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "bytes",
//                         "name": "extraData",
//                         "type": "bytes"
//                       }
//                     ],
//                     "internalType": "struct NftAddLiquidity",
//                     "name": "addLiquidityParams",
//                     "type": "tuple"
//                   }
//                 ],
//                 "internalType": "struct NftZapIn",
//                 "name": "zap",
//                 "type": "tuple"
//               },
//               {
//                 "internalType": "bytes",
//                 "name": "extraData",
//                 "type": "bytes"
//               }
//             ],
//             "internalType": "struct NftIncrease",
//             "name": "increase",
//             "type": "tuple"
//           }
//         ],
//         "internalType": "struct NftRebalance",
//         "name": "params",
//         "type": "tuple"
//       },
//       {
//         "internalType": "address[]",
//         "name": "sweepTokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "rebalance",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "contract Sickle",
//         "name": "sickle",
//         "type": "address"
//       },
//       {
//         "components": [
//           {
//             "internalType": "contract IUniswapV3Pool",
//             "name": "pool",
//             "type": "address"
//           },
//           {
//             "components": [
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "stakingContract",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "poolIndex",
//                     "type": "uint256"
//                   }
//                 ],
//                 "internalType": "struct Farm",
//                 "name": "farm",
//                 "type": "tuple"
//               },
//               {
//                 "internalType": "contract INonfungiblePositionManager",
//                 "name": "nft",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "tokenId",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct NftPosition",
//             "name": "position",
//             "type": "tuple"
//           },
//           {
//             "components": [
//               {
//                 "components": [
//                   {
//                     "internalType": "address[]",
//                     "name": "rewardTokens",
//                     "type": "address[]"
//                   },
//                   {
//                     "internalType": "uint128",
//                     "name": "amount0Max",
//                     "type": "uint128"
//                   },
//                   {
//                     "internalType": "uint128",
//                     "name": "amount1Max",
//                     "type": "uint128"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct SimpleNftHarvest",
//                 "name": "harvest",
//                 "type": "tuple"
//               },
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "router",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amountIn",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "minAmountOut",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "tokenIn",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct SwapParams[]",
//                 "name": "swaps",
//                 "type": "tuple[]"
//               },
//               {
//                 "internalType": "address[]",
//                 "name": "outputTokens",
//                 "type": "address[]"
//               }
//             ],
//             "internalType": "struct NftHarvest",
//             "name": "harvest",
//             "type": "tuple"
//           },
//           {
//             "components": [
//               {
//                 "components": [
//                   {
//                     "components": [
//                       {
//                         "internalType": "contract INonfungiblePositionManager",
//                         "name": "nft",
//                         "type": "address"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "tokenId",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "uint128",
//                         "name": "liquidity",
//                         "type": "uint128"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "amount0Min",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "amount1Min",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "uint128",
//                         "name": "amount0Max",
//                         "type": "uint128"
//                       },
//                       {
//                         "internalType": "uint128",
//                         "name": "amount1Max",
//                         "type": "uint128"
//                       },
//                       {
//                         "internalType": "bytes",
//                         "name": "extraData",
//                         "type": "bytes"
//                       }
//                     ],
//                     "internalType": "struct NftRemoveLiquidity",
//                     "name": "removeLiquidityParams",
//                     "type": "tuple"
//                   },
//                   {
//                     "components": [
//                       {
//                         "internalType": "address",
//                         "name": "router",
//                         "type": "address"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "amountIn",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "minAmountOut",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "address",
//                         "name": "tokenIn",
//                         "type": "address"
//                       },
//                       {
//                         "internalType": "bytes",
//                         "name": "extraData",
//                         "type": "bytes"
//                       }
//                     ],
//                     "internalType": "struct SwapParams[]",
//                     "name": "swaps",
//                     "type": "tuple[]"
//                   }
//                 ],
//                 "internalType": "struct NftZapOut",
//                 "name": "zap",
//                 "type": "tuple"
//               },
//               {
//                 "internalType": "address[]",
//                 "name": "tokensOut",
//                 "type": "address[]"
//               },
//               {
//                 "internalType": "bytes",
//                 "name": "extraData",
//                 "type": "bytes"
//               }
//             ],
//             "internalType": "struct NftWithdraw",
//             "name": "withdraw",
//             "type": "tuple"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "address[]",
//                 "name": "tokensIn",
//                 "type": "address[]"
//               },
//               {
//                 "internalType": "uint256[]",
//                 "name": "amountsIn",
//                 "type": "uint256[]"
//               },
//               {
//                 "components": [
//                   {
//                     "components": [
//                       {
//                         "internalType": "address",
//                         "name": "router",
//                         "type": "address"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "amountIn",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "minAmountOut",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "address",
//                         "name": "tokenIn",
//                         "type": "address"
//                       },
//                       {
//                         "internalType": "bytes",
//                         "name": "extraData",
//                         "type": "bytes"
//                       }
//                     ],
//                     "internalType": "struct SwapParams[]",
//                     "name": "swaps",
//                     "type": "tuple[]"
//                   },
//                   {
//                     "components": [
//                       {
//                         "internalType": "contract INonfungiblePositionManager",
//                         "name": "nft",
//                         "type": "address"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "tokenId",
//                         "type": "uint256"
//                       },
//                       {
//                         "components": [
//                           {
//                             "internalType": "address",
//                             "name": "token0",
//                             "type": "address"
//                           },
//                           {
//                             "internalType": "address",
//                             "name": "token1",
//                             "type": "address"
//                           },
//                           {
//                             "internalType": "uint24",
//                             "name": "fee",
//                             "type": "uint24"
//                           }
//                         ],
//                         "internalType": "struct Pool",
//                         "name": "pool",
//                         "type": "tuple"
//                       },
//                       {
//                         "internalType": "int24",
//                         "name": "tickLower",
//                         "type": "int24"
//                       },
//                       {
//                         "internalType": "int24",
//                         "name": "tickUpper",
//                         "type": "int24"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "amount0Desired",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "amount1Desired",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "amount0Min",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "uint256",
//                         "name": "amount1Min",
//                         "type": "uint256"
//                       },
//                       {
//                         "internalType": "bytes",
//                         "name": "extraData",
//                         "type": "bytes"
//                       }
//                     ],
//                     "internalType": "struct NftAddLiquidity",
//                     "name": "addLiquidityParams",
//                     "type": "tuple"
//                   }
//                 ],
//                 "internalType": "struct NftZapIn",
//                 "name": "zap",
//                 "type": "tuple"
//               },
//               {
//                 "internalType": "bytes",
//                 "name": "extraData",
//                 "type": "bytes"
//               }
//             ],
//             "internalType": "struct NftIncrease",
//             "name": "increase",
//             "type": "tuple"
//           }
//         ],
//         "internalType": "struct NftRebalance",
//         "name": "params",
//         "type": "tuple"
//       },
//       {
//         "internalType": "address[]",
//         "name": "sweepTokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "rebalanceFor",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "stakingContract",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "poolIndex",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct Farm",
//             "name": "farm",
//             "type": "tuple"
//           },
//           {
//             "internalType": "contract INonfungiblePositionManager",
//             "name": "nft",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "tokenId",
//             "type": "uint256"
//           }
//         ],
//         "internalType": "struct NftPosition",
//         "name": "position",
//         "type": "tuple"
//       },
//       {
//         "internalType": "bytes",
//         "name": "extraData",
//         "type": "bytes"
//       },
//       {
//         "components": [
//           {
//             "internalType": "contract IUniswapV3Pool",
//             "name": "pool",
//             "type": "address"
//           },
//           {
//             "internalType": "bool",
//             "name": "autoRebalance",
//             "type": "bool"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "uint24",
//                 "name": "tickSpacesBelow",
//                 "type": "uint24"
//               },
//               {
//                 "internalType": "uint24",
//                 "name": "tickSpacesAbove",
//                 "type": "uint24"
//               },
//               {
//                 "internalType": "int24",
//                 "name": "bufferTicksBelow",
//                 "type": "int24"
//               },
//               {
//                 "internalType": "int24",
//                 "name": "bufferTicksAbove",
//                 "type": "int24"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "dustBP",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "priceImpactBP",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "slippageBP",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "int24",
//                 "name": "cutoffTickLow",
//                 "type": "int24"
//               },
//               {
//                 "internalType": "int24",
//                 "name": "cutoffTickHigh",
//                 "type": "int24"
//               },
//               {
//                 "internalType": "uint8",
//                 "name": "delayMin",
//                 "type": "uint8"
//               },
//               {
//                 "components": [
//                   {
//                     "internalType": "enum RewardBehavior",
//                     "name": "rewardBehavior",
//                     "type": "uint8"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "harvestTokenOut",
//                     "type": "address"
//                   }
//                 ],
//                 "internalType": "struct RewardConfig",
//                 "name": "rewardConfig",
//                 "type": "tuple"
//               }
//             ],
//             "internalType": "struct RebalanceConfig",
//             "name": "rebalanceConfig",
//             "type": "tuple"
//           },
//           {
//             "internalType": "bool",
//             "name": "automateRewards",
//             "type": "bool"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "enum RewardBehavior",
//                 "name": "rewardBehavior",
//                 "type": "uint8"
//               },
//               {
//                 "internalType": "address",
//                 "name": "harvestTokenOut",
//                 "type": "address"
//               }
//             ],
//             "internalType": "struct RewardConfig",
//             "name": "rewardConfig",
//             "type": "tuple"
//           },
//           {
//             "internalType": "bool",
//             "name": "autoExit",
//             "type": "bool"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "int24",
//                 "name": "triggerTickLow",
//                 "type": "int24"
//               },
//               {
//                 "internalType": "int24",
//                 "name": "triggerTickHigh",
//                 "type": "int24"
//               },
//               {
//                 "internalType": "address",
//                 "name": "exitTokenOutLow",
//                 "type": "address"
//               },
//               {
//                 "internalType": "address",
//                 "name": "exitTokenOutHigh",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "priceImpactBP",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "slippageBP",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct ExitConfig",
//             "name": "exitConfig",
//             "type": "tuple"
//           }
//         ],
//         "internalType": "struct NftSettings",
//         "name": "settings",
//         "type": "tuple"
//       },
//       {
//         "internalType": "address",
//         "name": "approved",
//         "type": "address"
//       },
//       {
//         "internalType": "bytes32",
//         "name": "referralCode",
//         "type": "bytes32"
//       }
//     ],
//     "name": "simpleDeposit",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "stakingContract",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "poolIndex",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct Farm",
//             "name": "farm",
//             "type": "tuple"
//           },
//           {
//             "internalType": "contract INonfungiblePositionManager",
//             "name": "nft",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "tokenId",
//             "type": "uint256"
//           }
//         ],
//         "internalType": "struct NftPosition",
//         "name": "position",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "internalType": "address[]",
//             "name": "rewardTokens",
//             "type": "address[]"
//           },
//           {
//             "internalType": "uint128",
//             "name": "amount0Max",
//             "type": "uint128"
//           },
//           {
//             "internalType": "uint128",
//             "name": "amount1Max",
//             "type": "uint128"
//           },
//           {
//             "internalType": "bytes",
//             "name": "extraData",
//             "type": "bytes"
//           }
//         ],
//         "internalType": "struct SimpleNftHarvest",
//         "name": "harvestParams",
//         "type": "tuple"
//       },
//       {
//         "internalType": "bytes",
//         "name": "withdrawExtraData",
//         "type": "bytes"
//       }
//     ],
//     "name": "simpleExit",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "stakingContract",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "poolIndex",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct Farm",
//             "name": "farm",
//             "type": "tuple"
//           },
//           {
//             "internalType": "contract INonfungiblePositionManager",
//             "name": "nft",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "tokenId",
//             "type": "uint256"
//           }
//         ],
//         "internalType": "struct NftPosition",
//         "name": "position",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "internalType": "address[]",
//             "name": "rewardTokens",
//             "type": "address[]"
//           },
//           {
//             "internalType": "uint128",
//             "name": "amount0Max",
//             "type": "uint128"
//           },
//           {
//             "internalType": "uint128",
//             "name": "amount1Max",
//             "type": "uint128"
//           },
//           {
//             "internalType": "bytes",
//             "name": "extraData",
//             "type": "bytes"
//           }
//         ],
//         "internalType": "struct SimpleNftHarvest",
//         "name": "params",
//         "type": "tuple"
//       }
//     ],
//     "name": "simpleHarvest",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "stakingContract",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "poolIndex",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct Farm",
//             "name": "farm",
//             "type": "tuple"
//           },
//           {
//             "internalType": "contract INonfungiblePositionManager",
//             "name": "nft",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "tokenId",
//             "type": "uint256"
//           }
//         ],
//         "internalType": "struct NftPosition",
//         "name": "position",
//         "type": "tuple"
//       },
//       {
//         "internalType": "bytes",
//         "name": "extraData",
//         "type": "bytes"
//       }
//     ],
//     "name": "simpleWithdraw",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "strategyAddress",
//     "outputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "swapLib",
//     "outputs": [
//       {
//         "internalType": "contract ISwapLib",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "transferLib",
//     "outputs": [
//       {
//         "internalType": "contract ITransferLib",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "stakingContract",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "poolIndex",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct Farm",
//             "name": "farm",
//             "type": "tuple"
//           },
//           {
//             "internalType": "contract INonfungiblePositionManager",
//             "name": "nft",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "tokenId",
//             "type": "uint256"
//           }
//         ],
//         "internalType": "struct NftPosition",
//         "name": "position",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "components": [
//                   {
//                     "internalType": "contract INonfungiblePositionManager",
//                     "name": "nft",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "tokenId",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint128",
//                     "name": "liquidity",
//                     "type": "uint128"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amount0Min",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amount1Min",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint128",
//                     "name": "amount0Max",
//                     "type": "uint128"
//                   },
//                   {
//                     "internalType": "uint128",
//                     "name": "amount1Max",
//                     "type": "uint128"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct NftRemoveLiquidity",
//                 "name": "removeLiquidityParams",
//                 "type": "tuple"
//               },
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "router",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amountIn",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "minAmountOut",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "tokenIn",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct SwapParams[]",
//                 "name": "swaps",
//                 "type": "tuple[]"
//               }
//             ],
//             "internalType": "struct NftZapOut",
//             "name": "zap",
//             "type": "tuple"
//           },
//           {
//             "internalType": "address[]",
//             "name": "tokensOut",
//             "type": "address[]"
//           },
//           {
//             "internalType": "bytes",
//             "name": "extraData",
//             "type": "bytes"
//           }
//         ],
//         "internalType": "struct NftWithdraw",
//         "name": "params",
//         "type": "tuple"
//       },
//       {
//         "internalType": "address[]",
//         "name": "sweepTokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "withdraw",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ]

// const FARM_STRATEGY_ABI = [
//   {
//     "inputs": [
//       {
//         "internalType": "contract SickleFactory",
//         "name": "factory",
//         "type": "address"
//       },
//       {
//         "internalType": "contract ConnectorRegistry",
//         "name": "connectorRegistry",
//         "type": "address"
//       },
//       {
//         "components": [
//           {
//             "internalType": "contract ITransferLib",
//             "name": "transferLib",
//             "type": "address"
//           },
//           {
//             "internalType": "contract ISwapLib",
//             "name": "swapLib",
//             "type": "address"
//           },
//           {
//             "internalType": "contract IFeesLib",
//             "name": "feesLib",
//             "type": "address"
//           },
//           {
//             "internalType": "contract IZapLib",
//             "name": "zapLib",
//             "type": "address"
//           },
//           {
//             "internalType": "contract IPositionSettingsLib",
//             "name": "positionSettingsLib",
//             "type": "address"
//           }
//         ],
//         "internalType": "struct FarmStrategy.Libraries",
//         "name": "libraries",
//         "type": "tuple"
//       },
//       {
//         "internalType": "contract IPositionSettingsRegistry",
//         "name": "_positionSettingsRegistry",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "constructor"
//   },
//   {
//     "inputs": [],
//     "name": "NotApproved",
//     "type": "error"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "sender",
//         "type": "address"
//       }
//     ],
//     "name": "NotOwner",
//     "type": "error"
//   },
//   {
//     "inputs": [],
//     "name": "NotRegisteredSickle",
//     "type": "error"
//   },
//   {
//     "inputs": [],
//     "name": "SickleNotDeployed",
//     "type": "error"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "contract Sickle",
//         "name": "sickle",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "claimStakingContract",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "claimPoolIndex",
//         "type": "uint256"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "depositStakingContract",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "depositPoolIndex",
//         "type": "uint256"
//       }
//     ],
//     "name": "SickleCompounded",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "contract Sickle",
//         "name": "sickle",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "stakingContract",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "uint256",
//         "name": "poolIndex",
//         "type": "uint256"
//       }
//     ],
//     "name": "SickleDeposited",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "contract Sickle",
//         "name": "sickle",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "stakingContract",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "uint256",
//         "name": "poolIndex",
//         "type": "uint256"
//       }
//     ],
//     "name": "SickleExited",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "contract Sickle",
//         "name": "sickle",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "stakingContract",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "uint256",
//         "name": "poolIndex",
//         "type": "uint256"
//       }
//     ],
//     "name": "SickleHarvested",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "contract Sickle",
//         "name": "sickle",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "stakingContract",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "uint256",
//         "name": "poolIndex",
//         "type": "uint256"
//       }
//     ],
//     "name": "SickleWithdrawn",
//     "type": "event"
//   },
//   {
//     "inputs": [
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "stakingContract",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "poolIndex",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct Farm",
//             "name": "claimFarm",
//             "type": "tuple"
//           },
//           {
//             "internalType": "bytes",
//             "name": "claimExtraData",
//             "type": "bytes"
//           },
//           {
//             "internalType": "address[]",
//             "name": "rewardTokens",
//             "type": "address[]"
//           },
//           {
//             "components": [
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "router",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amountIn",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "minAmountOut",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "tokenIn",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct SwapParams[]",
//                 "name": "swaps",
//                 "type": "tuple[]"
//               },
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "router",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "lpToken",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "address[]",
//                     "name": "tokens",
//                     "type": "address[]"
//                   },
//                   {
//                     "internalType": "uint256[]",
//                     "name": "desiredAmounts",
//                     "type": "uint256[]"
//                   },
//                   {
//                     "internalType": "uint256[]",
//                     "name": "minAmounts",
//                     "type": "uint256[]"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct AddLiquidityParams",
//                 "name": "addLiquidityParams",
//                 "type": "tuple"
//               }
//             ],
//             "internalType": "struct ZapIn",
//             "name": "zap",
//             "type": "tuple"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "stakingContract",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "poolIndex",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct Farm",
//             "name": "depositFarm",
//             "type": "tuple"
//           },
//           {
//             "internalType": "bytes",
//             "name": "depositExtraData",
//             "type": "bytes"
//           }
//         ],
//         "internalType": "struct CompoundParams",
//         "name": "params",
//         "type": "tuple"
//       },
//       {
//         "internalType": "address[]",
//         "name": "sweepTokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "compound",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "contract Sickle",
//         "name": "sickle",
//         "type": "address"
//       },
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "stakingContract",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "poolIndex",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct Farm",
//             "name": "claimFarm",
//             "type": "tuple"
//           },
//           {
//             "internalType": "bytes",
//             "name": "claimExtraData",
//             "type": "bytes"
//           },
//           {
//             "internalType": "address[]",
//             "name": "rewardTokens",
//             "type": "address[]"
//           },
//           {
//             "components": [
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "router",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amountIn",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "minAmountOut",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "tokenIn",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct SwapParams[]",
//                 "name": "swaps",
//                 "type": "tuple[]"
//               },
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "router",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "lpToken",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "address[]",
//                     "name": "tokens",
//                     "type": "address[]"
//                   },
//                   {
//                     "internalType": "uint256[]",
//                     "name": "desiredAmounts",
//                     "type": "uint256[]"
//                   },
//                   {
//                     "internalType": "uint256[]",
//                     "name": "minAmounts",
//                     "type": "uint256[]"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct AddLiquidityParams",
//                 "name": "addLiquidityParams",
//                 "type": "tuple"
//               }
//             ],
//             "internalType": "struct ZapIn",
//             "name": "zap",
//             "type": "tuple"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "stakingContract",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "poolIndex",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct Farm",
//             "name": "depositFarm",
//             "type": "tuple"
//           },
//           {
//             "internalType": "bytes",
//             "name": "depositExtraData",
//             "type": "bytes"
//           }
//         ],
//         "internalType": "struct CompoundParams",
//         "name": "params",
//         "type": "tuple"
//       },
//       {
//         "internalType": "address[]",
//         "name": "sweepTokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "compoundFor",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "connectorRegistry",
//     "outputs": [
//       {
//         "internalType": "contract ConnectorRegistry",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "stakingContract",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "poolIndex",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct Farm",
//             "name": "farm",
//             "type": "tuple"
//           },
//           {
//             "internalType": "address[]",
//             "name": "tokensIn",
//             "type": "address[]"
//           },
//           {
//             "internalType": "uint256[]",
//             "name": "amountsIn",
//             "type": "uint256[]"
//           },
//           {
//             "components": [
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "router",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amountIn",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "minAmountOut",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "tokenIn",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct SwapParams[]",
//                 "name": "swaps",
//                 "type": "tuple[]"
//               },
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "router",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "lpToken",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "address[]",
//                     "name": "tokens",
//                     "type": "address[]"
//                   },
//                   {
//                     "internalType": "uint256[]",
//                     "name": "desiredAmounts",
//                     "type": "uint256[]"
//                   },
//                   {
//                     "internalType": "uint256[]",
//                     "name": "minAmounts",
//                     "type": "uint256[]"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct AddLiquidityParams",
//                 "name": "addLiquidityParams",
//                 "type": "tuple"
//               }
//             ],
//             "internalType": "struct ZapIn",
//             "name": "zap",
//             "type": "tuple"
//           },
//           {
//             "internalType": "bytes",
//             "name": "extraData",
//             "type": "bytes"
//           }
//         ],
//         "internalType": "struct DepositParams",
//         "name": "params",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "internalType": "contract IPool",
//             "name": "pair",
//             "type": "address"
//           },
//           {
//             "internalType": "address",
//             "name": "router",
//             "type": "address"
//           },
//           {
//             "internalType": "bool",
//             "name": "automateRewards",
//             "type": "bool"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "enum RewardBehavior",
//                 "name": "rewardBehavior",
//                 "type": "uint8"
//               },
//               {
//                 "internalType": "address",
//                 "name": "harvestTokenOut",
//                 "type": "address"
//               }
//             ],
//             "internalType": "struct RewardConfig",
//             "name": "rewardConfig",
//             "type": "tuple"
//           },
//           {
//             "internalType": "bool",
//             "name": "autoExit",
//             "type": "bool"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "uint256",
//                 "name": "triggerPriceHigh",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "triggerPriceLow",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "triggerReserves0",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "triggerReserves1",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "address",
//                 "name": "exitTokenOutLow",
//                 "type": "address"
//               },
//               {
//                 "internalType": "address",
//                 "name": "exitTokenOutHigh",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "priceImpactBP",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "slippageBP",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct ExitConfig",
//             "name": "exitConfig",
//             "type": "tuple"
//           }
//         ],
//         "internalType": "struct PositionSettings",
//         "name": "positionSettings",
//         "type": "tuple"
//       },
//       {
//         "internalType": "address[]",
//         "name": "sweepTokens",
//         "type": "address[]"
//       },
//       {
//         "internalType": "address",
//         "name": "approved",
//         "type": "address"
//       },
//       {
//         "internalType": "bytes32",
//         "name": "referralCode",
//         "type": "bytes32"
//       }
//     ],
//     "name": "deposit",
//     "outputs": [],
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "components": [
//           {
//             "internalType": "address",
//             "name": "stakingContract",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "poolIndex",
//             "type": "uint256"
//           }
//         ],
//         "internalType": "struct Farm",
//         "name": "farm",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "router",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "amountIn",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "minAmountOut",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "address",
//                 "name": "tokenIn",
//                 "type": "address"
//               },
//               {
//                 "internalType": "bytes",
//                 "name": "extraData",
//                 "type": "bytes"
//               }
//             ],
//             "internalType": "struct SwapParams[]",
//             "name": "swaps",
//             "type": "tuple[]"
//           },
//           {
//             "internalType": "bytes",
//             "name": "extraData",
//             "type": "bytes"
//           },
//           {
//             "internalType": "address[]",
//             "name": "tokensOut",
//             "type": "address[]"
//           }
//         ],
//         "internalType": "struct HarvestParams",
//         "name": "harvestParams",
//         "type": "tuple"
//       },
//       {
//         "internalType": "address[]",
//         "name": "harvestSweepTokens",
//         "type": "address[]"
//       },
//       {
//         "components": [
//           {
//             "internalType": "bytes",
//             "name": "extraData",
//             "type": "bytes"
//           },
//           {
//             "components": [
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "router",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "lpToken",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "address[]",
//                     "name": "tokens",
//                     "type": "address[]"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "lpAmountIn",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256[]",
//                     "name": "minAmountsOut",
//                     "type": "uint256[]"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct RemoveLiquidityParams",
//                 "name": "removeLiquidityParams",
//                 "type": "tuple"
//               },
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "router",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amountIn",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "minAmountOut",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "tokenIn",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct SwapParams[]",
//                 "name": "swaps",
//                 "type": "tuple[]"
//               }
//             ],
//             "internalType": "struct ZapOut",
//             "name": "zap",
//             "type": "tuple"
//           },
//           {
//             "internalType": "address[]",
//             "name": "tokensOut",
//             "type": "address[]"
//           }
//         ],
//         "internalType": "struct WithdrawParams",
//         "name": "withdrawParams",
//         "type": "tuple"
//       },
//       {
//         "internalType": "address[]",
//         "name": "withdrawSweepTokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "exit",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "contract Sickle",
//         "name": "sickle",
//         "type": "address"
//       },
//       {
//         "components": [
//           {
//             "internalType": "address",
//             "name": "stakingContract",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "poolIndex",
//             "type": "uint256"
//           }
//         ],
//         "internalType": "struct Farm",
//         "name": "farm",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "router",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "amountIn",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "minAmountOut",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "address",
//                 "name": "tokenIn",
//                 "type": "address"
//               },
//               {
//                 "internalType": "bytes",
//                 "name": "extraData",
//                 "type": "bytes"
//               }
//             ],
//             "internalType": "struct SwapParams[]",
//             "name": "swaps",
//             "type": "tuple[]"
//           },
//           {
//             "internalType": "bytes",
//             "name": "extraData",
//             "type": "bytes"
//           },
//           {
//             "internalType": "address[]",
//             "name": "tokensOut",
//             "type": "address[]"
//           }
//         ],
//         "internalType": "struct HarvestParams",
//         "name": "harvestParams",
//         "type": "tuple"
//       },
//       {
//         "internalType": "address[]",
//         "name": "harvestSweepTokens",
//         "type": "address[]"
//       },
//       {
//         "components": [
//           {
//             "internalType": "bytes",
//             "name": "extraData",
//             "type": "bytes"
//           },
//           {
//             "components": [
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "router",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "lpToken",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "address[]",
//                     "name": "tokens",
//                     "type": "address[]"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "lpAmountIn",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256[]",
//                     "name": "minAmountsOut",
//                     "type": "uint256[]"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct RemoveLiquidityParams",
//                 "name": "removeLiquidityParams",
//                 "type": "tuple"
//               },
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "router",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amountIn",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "minAmountOut",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "tokenIn",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct SwapParams[]",
//                 "name": "swaps",
//                 "type": "tuple[]"
//               }
//             ],
//             "internalType": "struct ZapOut",
//             "name": "zap",
//             "type": "tuple"
//           },
//           {
//             "internalType": "address[]",
//             "name": "tokensOut",
//             "type": "address[]"
//           }
//         ],
//         "internalType": "struct WithdrawParams",
//         "name": "withdrawParams",
//         "type": "tuple"
//       },
//       {
//         "internalType": "address[]",
//         "name": "withdrawSweepTokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "exitFor",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "factory",
//     "outputs": [
//       {
//         "internalType": "contract SickleFactory",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "feesLib",
//     "outputs": [
//       {
//         "internalType": "contract IFeesLib",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "owner",
//         "type": "address"
//       },
//       {
//         "internalType": "address",
//         "name": "approved",
//         "type": "address"
//       },
//       {
//         "internalType": "bytes32",
//         "name": "referralCode",
//         "type": "bytes32"
//       }
//     ],
//     "name": "getOrDeploySickle",
//     "outputs": [
//       {
//         "internalType": "contract Sickle",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "owner",
//         "type": "address"
//       }
//     ],
//     "name": "getSickle",
//     "outputs": [
//       {
//         "internalType": "contract Sickle",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "components": [
//           {
//             "internalType": "address",
//             "name": "stakingContract",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "poolIndex",
//             "type": "uint256"
//           }
//         ],
//         "internalType": "struct Farm",
//         "name": "farm",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "router",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "amountIn",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "minAmountOut",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "address",
//                 "name": "tokenIn",
//                 "type": "address"
//               },
//               {
//                 "internalType": "bytes",
//                 "name": "extraData",
//                 "type": "bytes"
//               }
//             ],
//             "internalType": "struct SwapParams[]",
//             "name": "swaps",
//             "type": "tuple[]"
//           },
//           {
//             "internalType": "bytes",
//             "name": "extraData",
//             "type": "bytes"
//           },
//           {
//             "internalType": "address[]",
//             "name": "tokensOut",
//             "type": "address[]"
//           }
//         ],
//         "internalType": "struct HarvestParams",
//         "name": "params",
//         "type": "tuple"
//       },
//       {
//         "internalType": "address[]",
//         "name": "sweepTokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "harvest",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "contract Sickle",
//         "name": "sickle",
//         "type": "address"
//       },
//       {
//         "components": [
//           {
//             "internalType": "address",
//             "name": "stakingContract",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "poolIndex",
//             "type": "uint256"
//           }
//         ],
//         "internalType": "struct Farm",
//         "name": "farm",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "router",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "amountIn",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "minAmountOut",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "address",
//                 "name": "tokenIn",
//                 "type": "address"
//               },
//               {
//                 "internalType": "bytes",
//                 "name": "extraData",
//                 "type": "bytes"
//               }
//             ],
//             "internalType": "struct SwapParams[]",
//             "name": "swaps",
//             "type": "tuple[]"
//           },
//           {
//             "internalType": "bytes",
//             "name": "extraData",
//             "type": "bytes"
//           },
//           {
//             "internalType": "address[]",
//             "name": "tokensOut",
//             "type": "address[]"
//           }
//         ],
//         "internalType": "struct HarvestParams",
//         "name": "params",
//         "type": "tuple"
//       },
//       {
//         "internalType": "address[]",
//         "name": "sweepTokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "harvestFor",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "stakingContract",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "poolIndex",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct Farm",
//             "name": "farm",
//             "type": "tuple"
//           },
//           {
//             "internalType": "address[]",
//             "name": "tokensIn",
//             "type": "address[]"
//           },
//           {
//             "internalType": "uint256[]",
//             "name": "amountsIn",
//             "type": "uint256[]"
//           },
//           {
//             "components": [
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "router",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amountIn",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "minAmountOut",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "tokenIn",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct SwapParams[]",
//                 "name": "swaps",
//                 "type": "tuple[]"
//               },
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "router",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "lpToken",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "address[]",
//                     "name": "tokens",
//                     "type": "address[]"
//                   },
//                   {
//                     "internalType": "uint256[]",
//                     "name": "desiredAmounts",
//                     "type": "uint256[]"
//                   },
//                   {
//                     "internalType": "uint256[]",
//                     "name": "minAmounts",
//                     "type": "uint256[]"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct AddLiquidityParams",
//                 "name": "addLiquidityParams",
//                 "type": "tuple"
//               }
//             ],
//             "internalType": "struct ZapIn",
//             "name": "zap",
//             "type": "tuple"
//           },
//           {
//             "internalType": "bytes",
//             "name": "extraData",
//             "type": "bytes"
//           }
//         ],
//         "internalType": "struct DepositParams",
//         "name": "params",
//         "type": "tuple"
//       },
//       {
//         "internalType": "address[]",
//         "name": "sweepTokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "increase",
//     "outputs": [],
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "positionSettingsLib",
//     "outputs": [
//       {
//         "internalType": "contract IPositionSettingsLib",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "positionSettingsRegistry",
//     "outputs": [
//       {
//         "internalType": "contract IPositionSettingsRegistry",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "stakingContract",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "poolIndex",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct Farm",
//             "name": "farm",
//             "type": "tuple"
//           },
//           {
//             "internalType": "address",
//             "name": "lpToken",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "amountIn",
//             "type": "uint256"
//           },
//           {
//             "internalType": "bytes",
//             "name": "extraData",
//             "type": "bytes"
//           }
//         ],
//         "internalType": "struct SimpleDepositParams",
//         "name": "params",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "internalType": "contract IPool",
//             "name": "pair",
//             "type": "address"
//           },
//           {
//             "internalType": "address",
//             "name": "router",
//             "type": "address"
//           },
//           {
//             "internalType": "bool",
//             "name": "automateRewards",
//             "type": "bool"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "enum RewardBehavior",
//                 "name": "rewardBehavior",
//                 "type": "uint8"
//               },
//               {
//                 "internalType": "address",
//                 "name": "harvestTokenOut",
//                 "type": "address"
//               }
//             ],
//             "internalType": "struct RewardConfig",
//             "name": "rewardConfig",
//             "type": "tuple"
//           },
//           {
//             "internalType": "bool",
//             "name": "autoExit",
//             "type": "bool"
//           },
//           {
//             "components": [
//               {
//                 "internalType": "uint256",
//                 "name": "triggerPriceHigh",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "triggerPriceLow",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "triggerReserves0",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "triggerReserves1",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "address",
//                 "name": "exitTokenOutLow",
//                 "type": "address"
//               },
//               {
//                 "internalType": "address",
//                 "name": "exitTokenOutHigh",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "priceImpactBP",
//                 "type": "uint256"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "slippageBP",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct ExitConfig",
//             "name": "exitConfig",
//             "type": "tuple"
//           }
//         ],
//         "internalType": "struct PositionSettings",
//         "name": "positionSettings",
//         "type": "tuple"
//       },
//       {
//         "internalType": "address",
//         "name": "approved",
//         "type": "address"
//       },
//       {
//         "internalType": "bytes32",
//         "name": "referralCode",
//         "type": "bytes32"
//       }
//     ],
//     "name": "simpleDeposit",
//     "outputs": [],
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "components": [
//           {
//             "internalType": "address",
//             "name": "stakingContract",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "poolIndex",
//             "type": "uint256"
//           }
//         ],
//         "internalType": "struct Farm",
//         "name": "farm",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "internalType": "address[]",
//             "name": "rewardTokens",
//             "type": "address[]"
//           },
//           {
//             "internalType": "bytes",
//             "name": "extraData",
//             "type": "bytes"
//           }
//         ],
//         "internalType": "struct SimpleHarvestParams",
//         "name": "harvestParams",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "internalType": "address",
//             "name": "lpToken",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "amountOut",
//             "type": "uint256"
//           },
//           {
//             "internalType": "bytes",
//             "name": "extraData",
//             "type": "bytes"
//           }
//         ],
//         "internalType": "struct SimpleWithdrawParams",
//         "name": "withdrawParams",
//         "type": "tuple"
//       }
//     ],
//     "name": "simpleExit",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "components": [
//           {
//             "internalType": "address",
//             "name": "stakingContract",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "poolIndex",
//             "type": "uint256"
//           }
//         ],
//         "internalType": "struct Farm",
//         "name": "farm",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "internalType": "address[]",
//             "name": "rewardTokens",
//             "type": "address[]"
//           },
//           {
//             "internalType": "bytes",
//             "name": "extraData",
//             "type": "bytes"
//           }
//         ],
//         "internalType": "struct SimpleHarvestParams",
//         "name": "params",
//         "type": "tuple"
//       }
//     ],
//     "name": "simpleHarvest",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "components": [
//           {
//             "components": [
//               {
//                 "internalType": "address",
//                 "name": "stakingContract",
//                 "type": "address"
//               },
//               {
//                 "internalType": "uint256",
//                 "name": "poolIndex",
//                 "type": "uint256"
//               }
//             ],
//             "internalType": "struct Farm",
//             "name": "farm",
//             "type": "tuple"
//           },
//           {
//             "internalType": "address",
//             "name": "lpToken",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "amountIn",
//             "type": "uint256"
//           },
//           {
//             "internalType": "bytes",
//             "name": "extraData",
//             "type": "bytes"
//           }
//         ],
//         "internalType": "struct SimpleDepositParams",
//         "name": "params",
//         "type": "tuple"
//       }
//     ],
//     "name": "simpleIncrease",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "components": [
//           {
//             "internalType": "address",
//             "name": "stakingContract",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "poolIndex",
//             "type": "uint256"
//           }
//         ],
//         "internalType": "struct Farm",
//         "name": "farm",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "internalType": "address",
//             "name": "lpToken",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "amountOut",
//             "type": "uint256"
//           },
//           {
//             "internalType": "bytes",
//             "name": "extraData",
//             "type": "bytes"
//           }
//         ],
//         "internalType": "struct SimpleWithdrawParams",
//         "name": "params",
//         "type": "tuple"
//       }
//     ],
//     "name": "simpleWithdraw",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "strategyAddress",
//     "outputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "swapLib",
//     "outputs": [
//       {
//         "internalType": "contract ISwapLib",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "transferLib",
//     "outputs": [
//       {
//         "internalType": "contract ITransferLib",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "components": [
//           {
//             "internalType": "address",
//             "name": "stakingContract",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "poolIndex",
//             "type": "uint256"
//           }
//         ],
//         "internalType": "struct Farm",
//         "name": "farm",
//         "type": "tuple"
//       },
//       {
//         "components": [
//           {
//             "internalType": "bytes",
//             "name": "extraData",
//             "type": "bytes"
//           },
//           {
//             "components": [
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "router",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "lpToken",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "address[]",
//                     "name": "tokens",
//                     "type": "address[]"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "lpAmountIn",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256[]",
//                     "name": "minAmountsOut",
//                     "type": "uint256[]"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct RemoveLiquidityParams",
//                 "name": "removeLiquidityParams",
//                 "type": "tuple"
//               },
//               {
//                 "components": [
//                   {
//                     "internalType": "address",
//                     "name": "router",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "amountIn",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "uint256",
//                     "name": "minAmountOut",
//                     "type": "uint256"
//                   },
//                   {
//                     "internalType": "address",
//                     "name": "tokenIn",
//                     "type": "address"
//                   },
//                   {
//                     "internalType": "bytes",
//                     "name": "extraData",
//                     "type": "bytes"
//                   }
//                 ],
//                 "internalType": "struct SwapParams[]",
//                 "name": "swaps",
//                 "type": "tuple[]"
//               }
//             ],
//             "internalType": "struct ZapOut",
//             "name": "zap",
//             "type": "tuple"
//           },
//           {
//             "internalType": "address[]",
//             "name": "tokensOut",
//             "type": "address[]"
//           }
//         ],
//         "internalType": "struct WithdrawParams",
//         "name": "params",
//         "type": "tuple"
//       },
//       {
//         "internalType": "address[]",
//         "name": "sweepTokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "withdraw",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "zapLib",
//     "outputs": [
//       {
//         "internalType": "contract IZapLib",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   }
// ]

// const V2_GAUGE_ABI = [{"inputs":[{"internalType":"address","name":"_forwarder","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"address","name":"_feesVotingReward","type":"address"},{"internalType":"address","name":"_rewardToken","type":"address"},{"internalType":"address","name":"_voter","type":"address"},{"internalType":"bool","name":"_isPool","type":"bool"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"NotAlive","type":"error"},{"inputs":[],"name":"NotAuthorized","type":"error"},{"inputs":[],"name":"NotTeam","type":"error"},{"inputs":[],"name":"NotVoter","type":"error"},{"inputs":[],"name":"RewardRateTooHigh","type":"error"},{"inputs":[],"name":"ZeroAmount","type":"error"},{"inputs":[],"name":"ZeroRewardRate","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"claimed0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"claimed1","type":"uint256"}],"name":"ClaimFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ClaimRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NotifyReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_recipient","type":"address"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesVotingReward","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isPool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"}],"name":"isTrustedForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"left","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"notifyRewardWithoutClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardRateByEpoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ve","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"voter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

// const CL_FACTORY_ABI = [{"inputs":[{"internalType":"address","name":"_voter","type":"address"},{"internalType":"address","name":"_poolImplementation","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint24","name":"oldUnstakedFee","type":"uint24"},{"indexed":true,"internalType":"uint24","name":"newUnstakedFee","type":"uint24"}],"name":"DefaultUnstakedFeeChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":true,"internalType":"int24","name":"tickSpacing","type":"int24"},{"indexed":false,"internalType":"address","name":"pool","type":"address"}],"name":"PoolCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldFeeManager","type":"address"},{"indexed":true,"internalType":"address","name":"newFeeManager","type":"address"}],"name":"SwapFeeManagerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldFeeModule","type":"address"},{"indexed":true,"internalType":"address","name":"newFeeModule","type":"address"}],"name":"SwapFeeModuleChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"int24","name":"tickSpacing","type":"int24"},{"indexed":true,"internalType":"uint24","name":"fee","type":"uint24"}],"name":"TickSpacingEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldFeeManager","type":"address"},{"indexed":true,"internalType":"address","name":"newFeeManager","type":"address"}],"name":"UnstakedFeeManagerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldFeeModule","type":"address"},{"indexed":true,"internalType":"address","name":"newFeeModule","type":"address"}],"name":"UnstakedFeeModuleChanged","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allPools","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"allPoolsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"int24","name":"tickSpacing","type":"int24"},{"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"}],"name":"createPool","outputs":[{"internalType":"address","name":"pool","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"defaultUnstakedFee","outputs":[{"internalType":"uint24","name":"","type":"uint24"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int24","name":"tickSpacing","type":"int24"},{"internalType":"uint24","name":"fee","type":"uint24"}],"name":"enableTickSpacing","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"factoryRegistry","outputs":[{"internalType":"contract IFactoryRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"int24","name":"","type":"int24"}],"name":"getPool","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pool","type":"address"}],"name":"getSwapFee","outputs":[{"internalType":"uint24","name":"","type":"uint24"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pool","type":"address"}],"name":"getUnstakedFee","outputs":[{"internalType":"uint24","name":"","type":"uint24"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pool","type":"address"}],"name":"isPool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolImplementation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint24","name":"_defaultUnstakedFee","type":"uint24"}],"name":"setDefaultUnstakedFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_swapFeeManager","type":"address"}],"name":"setSwapFeeManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_swapFeeModule","type":"address"}],"name":"setSwapFeeModule","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_unstakedFeeManager","type":"address"}],"name":"setUnstakedFeeManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_unstakedFeeModule","type":"address"}],"name":"setUnstakedFeeModule","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapFeeManager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"swapFeeModule","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int24","name":"","type":"int24"}],"name":"tickSpacingToFee","outputs":[{"internalType":"uint24","name":"","type":"uint24"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tickSpacings","outputs":[{"internalType":"int24[]","name":"","type":"int24[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unstakedFeeManager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unstakedFeeModule","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"voter","outputs":[{"internalType":"contract IVoter","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

// const V2_FACTORY_ABI = [{"inputs":[{"internalType":"address","name":"_implementation","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"FeeInvalid","type":"error"},{"inputs":[],"name":"FeeTooHigh","type":"error"},{"inputs":[],"name":"InvalidPool","type":"error"},{"inputs":[],"name":"NotFeeManager","type":"error"},{"inputs":[],"name":"NotPauser","type":"error"},{"inputs":[],"name":"NotVoter","type":"error"},{"inputs":[],"name":"PoolAlreadyExists","type":"error"},{"inputs":[],"name":"SameAddress","type":"error"},{"inputs":[],"name":"ZeroAddress","type":"error"},{"inputs":[],"name":"ZeroFee","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":true,"internalType":"bool","name":"stable","type":"bool"},{"indexed":false,"internalType":"address","name":"pool","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"PoolCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"pool","type":"address"},{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"}],"name":"SetCustomFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"feeManager","type":"address"}],"name":"SetFeeManager","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"state","type":"bool"}],"name":"SetPauseState","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"pauser","type":"address"}],"name":"SetPauser","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"voter","type":"address"}],"name":"SetVoter","type":"event"},{"inputs":[],"name":"MAX_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ZERO_FEE_INDICATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allPools","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"allPoolsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"bool","name":"stable","type":"bool"}],"name":"createPool","outputs":[{"internalType":"address","name":"pool","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"}],"name":"createPool","outputs":[{"internalType":"address","name":"pool","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"customFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeManager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pool","type":"address"},{"internalType":"bool","name":"_stable","type":"bool"}],"name":"getFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"}],"name":"getPool","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"bool","name":"stable","type":"bool"}],"name":"getPool","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pool","type":"address"}],"name":"isPool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pauser","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pool","type":"address"},{"internalType":"uint256","name":"fee","type":"uint256"}],"name":"setCustomFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_stable","type":"bool"},{"internalType":"uint256","name":"_fee","type":"uint256"}],"name":"setFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeManager","type":"address"}],"name":"setFeeManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_state","type":"bool"}],"name":"setPauseState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pauser","type":"address"}],"name":"setPauser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_voter","type":"address"}],"name":"setVoter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stableFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"volatileFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"voter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
