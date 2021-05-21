(async () => {
	////////////////////////////////////////////////////////////////////////
	// CONFIGURATION
	////////////////////////////////////////////////////////////////////////


	// Blockchain data
	// Leave as null if you dont need its feature
	globalThis.tokenAddress = "0xb5ada178cedd3725d0b08050b8e0d86830a47f19";
	globalThis.stakingAddress = "";
	globalThis.lpAddress = "0x3679C6CCDf625cC76ba62013b10b47E37855Ee72";
	globalThis.lmAddress = "0x4de88FEaD6Bf21Dc4A61Bd3AF3629f6f1Dc6E967";

	// Your pool array index, usually abbreviated as pid
	globalThis.poolId = 0;

	// Get these data from The Explorer
	// Even if it is a long long text, just put it here and ignore.
	// Fold this line if your editor supports line folding
	globalThis.ABIs = {
		// WARNING: <REQUIRED> Your token contract ABI
		token: [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"Marketing_DevelopmentAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Marketing_DevelopmentPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"excludeAccount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"includeAccount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}],
		// <optional> Your staking pool ABI
		staking: [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ClaimAndStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dfine","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dfinePerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accDfinePerShare","type":"uint256"},{"internalType":"uint256","name":"depositedAmount","type":"uint256"},{"internalType":"uint256","name":"rewardsAmount","type":"uint256"},{"internalType":"uint256","name":"lockupDuration","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_dfinePerBlock","type":"uint256"}],"name":"setDfinePerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_dfine","type":"address"}],"name":"setDfineToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"startBlock","type":"uint256"}],"name":"startStaking","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"pendingRewards","type":"uint256"},{"internalType":"uint256","name":"lastClaim","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}],
		// <optional> Your Liquidity provider contract ABI
		lp: [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}],
		// <optional> Your Liquidity Mining contract ABI
		lm:[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dfine","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dfinePerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityMining","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accDfinePerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_dfinePerBlock","type":"uint256"}],"name":"setDfinePerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_dfine","type":"address"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"}],"name":"setDfineTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"startBlock","type":"uint256"}],"name":"startMining","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"pendingRewards","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
	}

	// Misc
	globalThis.refreshInterval = 60; // In seconds, minutes interval recommended
	globalThis.tokenNameToBeEarned = "DFINE"; // Decoration
	globalThis.lpTokenName = "DFINE-WBNB LP"; // Also decoration


	////////////////////////////////////////////////////////////////////////
	// CONFIGURATION END - DO NOT PASS. ONLY DEVELOPERS ALLOWED
	////////////////////////////////////////////////////////////////////////

	// WARNING: window.web3 is used in metamask, change to something else
	globalThis.web3 = {};

	globalThis.sender = null;
	globalThis.netId = null;
	globalThis.web3Modal = null;
	globalThis.provider = null;

	globalThis.tokenContract = null;
	globalThis.stakingContract = null;
	globalThis.lpContract = null;
	globalThis.lmContract = null;

	// Misc global variables
	globalThis.price = {bnb: 0, base: 0};

	// Prototypes overriding
	Number.prototype.toFixed = function(n) {
		// https://helloacm.com/javascripts-tofixed-implementation-without-rounding/

		const reg = new RegExp("^-?\\d+(?:\\.\\d{0," + n + "})?", "g")
		let a = this.toLocaleString('fullwide', {useGrouping: 0}).match(reg);
		a = a ? a[0] : '0';

		const dot = a.indexOf(".");
		if (dot === -1) { // integer, insert decimal dot and pad up zeros
			return a + "." + "0".repeat(n);
		}
		const b = n - (a.length - dot) + 1;
		return b > 0 ? (a + "0".repeat(b)) : a;
	}

	// Utils
	window.alert = function() {
		oldAlert([...arguments].join('\n'));
	}

	globalThis.vfetch = async function () {
		let response = await fetch(...arguments);
		let json = await response.json();

		if (!json.success) throw new Error(json.message);
		return json;
	}

	globalThis.getCoingeckoPrice = async function (id) {
		let response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`);
		let json = await response.json();

		return json[id].usd;
	}

	globalThis.toWei = function (num) {
		return num.toLocaleString('fullwide', {useGrouping: 0});
	}

	globalThis.sleep = async function (ms) {
		return new Promise(function(resolve, reject) {
			setTimeout(resolve, ms);
		});
	}

	// Init scripts
	async function initWeb3Requirements() {
		let connectButton = document.getElementById('connectButton'),
		senderAccountText = document.getElementById('senderAccount');
		const providerOptions = {
			// WARNING: Metamask warns about deprecated event 'close'
			injected: {
				display: {
					name: 'Browser Injected',
					description: 'Connect to your browser injected wallet',
				},
			},
			walletconnect: {
				package: Web3Modal.providers.WALLETCONNECT,
				options: {
					rpc: {
						1: "https://data-seed-prebsc-1-s1.binance.org:8545/",
						97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
						56: "https://bsc-dataseed.binance.org/",
					},
				},
			},
			'custom-binance': {
				display: {
					name: 'Binance',
					description: 'Connect to your Binance Chain Wallet',
					logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=010',
				},
				package: 'binance',
				connector: async (ProviderPackage, options) => {
					const provider = window.BinanceChain;
					await provider.enable();
					return provider;
				},
			},
		};

		try {
			globalThis.web3 = new Web3();
			globalThis.web3Modal = new window.Web3Modal.default({
				cacheProvider: true,
				providerOptions,
				disableInjectedProvider: false,
				theme: "dark"
			});
		} catch (error) {
			console.log(error);
		}

		// EVENT: onDisconnect
		async function onDisconnect() {
			// Web3 Clean up
			if (provider.close) {
				await provider.close();
				provider = null;
			}
			senderAccount = null;
			await web3Modal.clearCachedProvider();

			// Display clean up
			sessionStorage.removeItem('wallet');
			senderAccountText.innerText = 'Connect first. --->';
			connectButton.innerText = 'Connect';
		}

		// EVENT: Connect button event
		connectButton.onclick = async () => {
			if (connectButton.innerText == 'Out->') return onDisconnect();
			connectButton.innerText = '...';

			globalThis.provider = await web3Modal.connect();
			sessionStorage.setItem('wallet', 'connected');
			web3.setProvider(provider);
			globalThis.netId = await web3.eth.net.getId();

			if (netId != 97 && netId != 56) {
				// Our dApp only supports PreBSC (97) or MainBSC (56)
				alert(
					'Wrong Network!',
					'This application works only on the Binance Smart Chain.',
					'Please configure them in your wallet'
				);
				onDisconnect();
				return false;
		        }

			// Testnet info
			globalThis.isTestnet = netId == 97;

			// Retrieves account
			globalThis.sender = (await web3.eth.getAccounts())[0];
			if (!sender) {
				alert(
					'No account error',
					'This application requires web3 account, please add one if you haven\'t'
				);
				onDisconnect();
				return false;
			} else {
				senderAccountText.innerText = sender;
			}

			// Initialize pool contracts
			globalThis.tokenContract = new web3.eth.Contract(ABIs.token, tokenAddress);
			if (stakingAddress)
				globalThis.stakingContract = new web3.eth.Contract(ABIs.staking, stakingAddress);
			if (lpAddress)
				globalThis.lpContract = new web3.eth.Contract(ABIs.lp, lpAddress);
			if (lmAddress && lpAddress)
				globalThis.lmContract = new web3.eth.Contract(ABIs.lm, lmAddress);
			else if (!lpAddress)
				alert("Configuration error:", "lmAddress must be available with lpAddress");

			connectButton.innerText = 'Out->';
			refresh();

			// Disable redirection to the link provided
			return false;
		}
	}

	async function refresh() {
		if (!tokenContract) {
			// document.getElementById('content').style.filter = "opacity(0.1)";
			document.getElementById('content').style['pointer-events'] = "none";
			return;
		}

		////////////////////////////////////////////////////////////////
		// Staking pages cannot be used altogether. For instance:
		// You cant use Normal Staking feature with LP Staking feature
		// if you want it happen, please refer to our other template:
		//
		// https://github.com/DFINEDevs/StakingPool
		////////////////////////////////////////////////////////////////

		// Normal Staking page
		if (stakingContract) {
			await loadInside(document.getElementById('content'), './pages/normalstaking.html');
			// Variables
			[maxStake, maxUnstake] = document.getElementsByName('max');
			[stakeAmount, unstakeAmount] = document.getElementsByName('amount');
			[stakeButton, unstakeButton, claimButton] = document.getElementsByName('submit');

			// Web3 Requests
			let balance = await tokenContract.methods.balanceOf(sender).call(),
			staked = (await stakingContract.methods.userInfo(poolId, sender).call()).amount,
			earned = (await stakingContract.methods.pendingRewards(poolId, sender).call()),
			totalStaked = (await stakingContract.methods.poolInfo(poolId).call()).depositedAmount,
			tokenName = await tokenContract.methods.symbol.call().call();

			// Converting to precious digits
			balance = (+web3.utils.fromWei(balance)).toFixed(2);
			staked = (+web3.utils.fromWei(staked)).toFixed(2);
			earned = (+web3.utils.fromWei(earned)).toFixed(2);
			totalStaked = (+web3.utils.fromWei(totalStaked)).toFixed(2);

			// Display them
			document.getElementById('balance').innerText = `${balance} ${tokenName}`;
			document.getElementById('staked').innerText = `${staked} ${tokenName}`;
			document.getElementById('earned').innerText = `${earned} ${tokenNameToBeEarned}`;
			document.getElementById('totalStaked').innerText = `${totalStaked} ${tokenName}`;

			stakeAmount.placeholder = `${balance} ${tokenName}`;
			unstakeAmount.placeholder = `${staked} ${tokenName}`;

			// Events
			maxStake.onclick = () => { stakeAmount.value = balance.toFixed(2) };
			maxUnstake.onclick = () => { unstakeAmount.value = staked.toFixed(2) };

			stakeButton.onclick = async () => {
				let allowance = await tokenContract.methods.allowance(sender, stakingAddress).call(),
				targetAllowance = '1' + '0'.repeat(77);

				allowance = web3.utils.fromWei(allowance);
				targetAllowance = web3.utils.fromWei(targetAllowance);

				// Check if our contract is allowed to send invoice
				if (allowance >= targetAllowance) {
					// Deposit, because now we are allowed to spend their token
					await stakingContract.methods.deposit(poolId, web3.utils.toWei(stakeAmount.value)).send({
						from: sender
					}).on('transactionHash', function (txHash) {
						alert(
							'Tx processed!',
							`View transaction on https://${isTestnet?'testnet.':''}bscscan.com/tx/${txHash}`
						);
					});
				} else {
					// Request allowance
					await tokenContract.methods.approve(stakingAddress, '1' + '0'.repeat(77)).send({
						from: sender
					}).on('transactionHash', function (txHash) {
						alert(
							'Tx processed!',
							`View transaction on https://${isTestnet?'testnet.':''}bscscan.com/tx/${txHash}`
						);
					});
				}

				stakeAmount.value = '';
			};

			unstakeButton.onclick = async () => {
				await stakingContract.methods.withdraw(poolId, web3.utils.toWei(unstakeAmount.value)).send({
					from: sender
				}).on('transactionHash', function (txHash) {
					alert(
						'Tx processed!',
						`View transaction on https://${isTestnet?'testnet.':''}bscscan.com/tx/${txHash}`
					);
				});
			};
		} else if (lpContract && lmContract) {
			await loadInside(document.getElementById('content'), './pages/lpstaking.html');

			// Variables
			[maxStake, maxUnstake] = document.getElementsByName('max');
			[stakeAmount, unstakeAmount] = document.getElementsByName('amount');
			[stakeButton, unstakeButton, claimButton] = document.getElementsByName('submit');

			// Web3 Requests
			let balance = await lpContract.methods.balanceOf(sender).call(),
			staked = (await lmContract.methods.userInfo(sender).call()).amount,
			earned = (await lmContract.methods.pendingRewards(sender).call());
			// totalStaked = (await lmContract.methods.poolInfo().call()).depositedAmount;

			// Converting to precious digits
			balance = (+web3.utils.fromWei(balance)).toFixed(2);
			staked = (+web3.utils.fromWei(staked)).toFixed(2);
			earned = (+web3.utils.fromWei(earned)).toFixed(2);
			// totalStaked = (+web3.utils.fromWei(totalStaked)).toFixed(2);

			// Display them
			document.getElementById('balance').innerText = `${balance} ${lpTokenName}`;
			document.getElementById('staked').innerText = `${staked} ${lpTokenName}`;
			document.getElementById('earned').innerText = `${earned} ${tokenNameToBeEarned}`;
			// document.getElementById('totalStaked').innerText = `${totalStaked} ${lpTokenName}`;

			stakeAmount.placeholder = `${balance} ${lpTokenName}`;
			unstakeAmount.placeholder = `${staked} ${lpTokenName}`;

			// Events
			maxStake.onclick = () => { stakeAmount.value = balance.toFixed(2) };
			maxUnstake.onclick = () => { unstakeAmount.value = staked.toFixed(2) };

			stakeButton.onclick = async () => {
				let allowance = await lpContract.methods.allowance(sender, stakingAddress).call(),
				targetAllowance = '1' + '0'.repeat(77);

				allowance = web3.utils.fromWei(allowance);
				targetAllowance = web3.utils.fromWei(targetAllowance);

				// Check if our contract is allowed to send invoice
				if (allowance >= targetAllowance) {
					// Deposit, because now we are allowed to spend their token
					await lmContract.methods.deposit(+poolInfo.poolid, web3.utils.toWei(stakeAmount.value)).send({
						from: sender
					}).on('transactionHash', function (txHash) {
						alert(
							'Tx processed!',
							`View transaction on https://${isTestnet?'testnet.':''}bscscan.com/tx/${txHash}`
						);
					});
				} else {
					// Request allowance
					await lpContract.methods.approve(lmAddress, '1' + '0'.repeat(77)).send({
						from: sender
					}).on('transactionHash', function (txHash) {
						alert(
							'Tx processed!',
							`View transaction on https://${isTestnet?'testnet.':''}bscscan.com/tx/${txHash}`
						);
					});
				}

				stakeAmount.value = '';
			};

			unstakeButton.onclick = async () => {
				await lmContract.methods.withdraw(+poolInfo.poolid, web3.utils.toWei(unstakeAmount.value)).send({
					from: sender
				}).on('transactionHash', function (txHash) {
					alert(
						'Tx processed!',
						`View transaction on https://${isTestnet?'testnet.':''}bscscan.com/tx/${txHash}`
					);
				});
			};
		} else {
			alert("Configuration error:", "Please check index.js");
		}
	}

	// DOM Events
	refresh();
	initWeb3Requirements();
	setInterval(refresh, 1000 * refreshInterval);
})();
