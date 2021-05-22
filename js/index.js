(async () => {
	////////////////////////////////////////////////////////////////////////
	// CONFIGURATION
	////////////////////////////////////////////////////////////////////////


	// Blockchain data
	// Leave as null if you dont need its feature
	globalThis.tokenAddress = "";
	globalThis.stakingAddress = "";
	globalThis.lpAddress = "";
	globalThis.lmAddress = "";

	// Your pool array index, usually abbreviated as pid
	globalThis.poolId = 0;
	globalThis.tokenPerBlock = 0.0008; // Not in Wei, but in real number.

	// Get these data from The Explorer
	// Even if it is a long long text, just put it here and ignore.
	// Fold this line if your editor supports line folding
	globalThis.ABIs = {
		// WARNING: <REQUIRED> Your token contract ABI
		token: [],
		// <optional> Your staking pool ABI
		staking: [],
		// <optional> Your Liquidity provider contract ABI
		lp: [],
		// <optional> Your Liquidity Mining contract ABI
		lm: []
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
	let oldAlert = window.alert;
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
			if (sessionStorage.getItem('wallet'))
				document.getElementById('connectButton').onclick();
			return;
		} else {
			document.getElementById('content').style['pointer-events'] = "";
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
			tokenName = await tokenContract.methods.symbol.call().call();

			// Converting to precious digits
			balance = (+web3.utils.fromWei(balance)).toFixed(2);
			staked = (+web3.utils.fromWei(staked)).toFixed(2);
			earned = (+web3.utils.fromWei(earned)).toFixed(2);

			// Display them
			document.getElementById('balance').innerText = `${balance} ${tokenName}`;
			document.getElementById('staked').innerText = `${staked} ${tokenName}`;
			document.getElementById('earned').innerText = `${earned} ${tokenNameToBeEarned}`;
			document.getElementById('tokenPerBlock').innerText = `${tokenPerBlock} ${tokenNameToBeEarned}`;

			stakeAmount.placeholder = `${balance} ${tokenName}`;
			unstakeAmount.placeholder = `${staked} ${tokenName}`;

			// Events
			maxStake.onclick = () => { stakeAmount.value = balance };
			maxUnstake.onclick = () => { unstakeAmount.value = staked };

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

					refresh();
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

					refresh();
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

				refresh();
			};

			claimButton.onclick = async () => {
				await stakingContract.methods.claim(poolId).send({
					'from': sender
				}).on('transactionHash', function (txHash) {
					alert(
						'Tx processed!',
						`View transaction on https://${isTestnet?'testnet.':''}bscscan.com/tx/${txHash}`
					);
				});

				refresh();
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

			// Converting to precious digits
			balance = (+web3.utils.fromWei(balance)).toFixed(2);
			staked = (+web3.utils.fromWei(staked)).toFixed(2);
			earned = (+web3.utils.fromWei(earned)).toFixed(2);
			// totalStaked = (+web3.utils.fromWei(totalStaked)).toFixed(2);

			// Display them
			document.getElementById('balance').innerText = `${balance} ${lpTokenName}`;
			document.getElementById('staked').innerText = `${staked} ${lpTokenName}`;
			document.getElementById('earned').innerText = `${earned} ${tokenNameToBeEarned}`;
			document.getElementById('tokenPerBlock').innerText = `${tokenPerBlock} ${tokenNameToBeEarned}`;

			stakeAmount.placeholder = `${balance} ${lpTokenName}`;
			unstakeAmount.placeholder = `${staked} ${lpTokenName}`;

			// Events
			maxStake.onclick = () => { stakeAmount.value = balance };
			maxUnstake.onclick = () => { unstakeAmount.value = staked };

			stakeButton.onclick = async () => {
				let allowance = await lpContract.methods.allowance(sender, lmAddress).call(),
				targetAllowance = '1' + '0'.repeat(77);

				allowance = web3.utils.fromWei(allowance);
				targetAllowance = web3.utils.fromWei(targetAllowance);

				// Check if our contract is allowed to send invoice
				if (allowance >= targetAllowance) {
					// Deposit, because now we are allowed to spend their token
					await lmContract.methods.deposit(web3.utils.toWei(stakeAmount.value)).send({
						from: sender
					}).on('transactionHash', function (txHash) {
						alert(
							'Tx processed!',
							`View transaction on https://${isTestnet?'testnet.':''}bscscan.com/tx/${txHash}`
						);
					});

					refresh();
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

					refresh();
				}

				stakeAmount.value = '';
			};

			unstakeButton.onclick = async () => {
				await lmContract.methods.withdraw(web3.utils.toWei(unstakeAmount.value)).send({
					from: sender
				}).on('transactionHash', function (txHash) {
					alert(
						'Tx processed!',
						`View transaction on https://${isTestnet?'testnet.':''}bscscan.com/tx/${txHash}`
					);
				});

				refresh()
			};

			claimButton.onclick = async () => {
				await lmContract.methods.claim().send({
					'from': sender
		                }).on('transactionHash', function (txHash) {
					alert(
						'Tx processed!',
						`View transaction on https://${isTestnet?'testnet.':''}bscscan.com/tx/${txHash}`
					);
		                });

				refresh();
			};
		} else {
			alert("Configuration error:", "Please check index.js");
		}
	}

	// DOM Events
	await initWeb3Requirements();
	refresh();
	setInterval(refresh, 1000 * refreshInterval);
})();
