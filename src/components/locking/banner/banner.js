import React, { useState, useEffect } from "react";
import Web3 from "web3";
import {
    contractAddress,
    abi,
    tokenAddres,
    tokenAbi,
    refDefaultAddress
} from "../../../utils/constant";
import './banner.css';
import { toast } from 'react-toastify';

// import logo from "../../asset/images/logo.png";
import logo from "../../../asset/images/logo.png";
import menuIcon from "../../../asset/images/menuIcon.png";
import { Container } from "react-bootstrap";
function Banner() {

    let accountAd;
    const [disable, setDisable]= useState(false);
    const [disable1, setDisable1]= useState(false);
    const [disable2, setDisable2]= useState(false);

    const [account, setAccount] = useState("Connect");
    const [upline, setUpline] = useState(refDefaultAddress);

    const [dailyProfit1, set1dailyProfit] = useState(2.33);
    const [totalReturn1, set1TotalReturn] = useState(7);
    const [withdrawn1, set1withdrawn] = useState(0);
    const [withdrawnAble1, set1withdrawAble] = useState(0);
    const [enterAmount1, set1EnterAmount] = useState(0);

    const [fourteenDaysReward1, set1fourteenDaysReward] = useState(0);
    const [days1, set1days] = useState(0);

    const [dailyProfit2, set2dailyProfit] = useState(2.4);
    const [totalReturn2, set2TotalReturn] = useState(12);
    const [withdrawn2, set2withdrawn] = useState(0);
    const [withdrawnAble2, set2withdrawAble] = useState(0);
    const [enterAmount2, set2EnterAmount] = useState(0);
    const [fourteenDaysReward2, set2fourteenDaysReward] = useState(0);
    const [days2, set2days] = useState(1);

    const [dailyProfit3, set3dailyProfit] = useState(1.5);
    const [totalReturn3, set3TotalReturn] = useState(18);
    const [withdrawn3, set3withdrawn] = useState(0);
    const [withdrawnAble3, set3withdrawAble] = useState(0);
    const [enterAmount3, set3EnterAmount] = useState(0);
    const [fourteenDaysReward3, set3fourteenDaysReward] = useState(0);
    const [days3, set3days] = useState(2);

    const getData = async () => {
        try {
            const web3 = window.web3;
            let contract = new web3.eth.Contract(abi, contractAddress);
            // console.log("data", web3);
            let users = await contract.methods.Users(accountAd).call();
            // console.log("users", users);
            // console.log("users", users.lockableDays);
            if (users.lockableDays == days1) {
                // console.log("users", days1);
                let dailyprofit1 = await contract.methods.allocation(days1).call();
                let daily = dailyprofit1 / 365;
                let treturn = daily * days1;
                set1TotalReturn(treturn);
                // set1withdrawAble(users.WithdrawAbleReward);
                // set1withdrawAble(users.totalreward);
                set1withdrawn(users.WithdrawReward);
                set1dailyProfit(daily);

            } else if (users.lockableDays == days2) {
                // console.log("users", days2);
                let dailyprofit2 = await contract.methods.allocation(days2).call();
                let daily = dailyprofit2 / 365;
                let treturn = daily * days2;
                set2TotalReturn(treturn);
                set2withdrawn(users.WithdrawReward);
                // set2withdrawAble(users.totalreward);
                set2dailyProfit(daily);

            } else if (users.lockableDays == days3) {
                // console.log("users", days3);
                let dailyprofit3 = await contract.methods.allocation(days3).call();
                let daily = dailyprofit3 / 365;
                let treturn = daily * days3;
                set3TotalReturn(treturn);
                set3withdrawn(users.WithdrawReward);
                // set3withdrawAble(users.totalreward);
                set3dailyProfit(daily);
            }
            // set3withdrawAble

        } catch (error) {
            console.log("Error while checking locked account", error);
        }
    };
    const DepositPlan3 = async (e) => {
        try {
            console.log("Plan 3")
            const web3 = window.web3;
            let contract = new web3.eth.Contract(abi, contractAddress);
            let tokenContract = new web3.eth.Contract(tokenAbi, tokenAddres);
                let RemainingTokens =await tokenContract.methods.balanceOf(account).call();
                let ActualRemainingTokens = await web3.utils.fromWei(RemainingTokens);
                console.log("ahan ", enterAmount3)
                if (enterAmount3 >= 1) 
                {
                    if(parseInt(enterAmount3)>ActualRemainingTokens){
                        
                        toast.error("Oops! Your Entered Amount is greater than Your Balance");
                    }
                    else{
                    console.log("Check Account",account)
                     let Accountinfo =await tokenContract.methods.allowance(account,contractAddress)
                        .call()
                        // account info = 300000000
                        console.log("Account Info:", Accountinfo)
                       await tokenContract.methods.approve(contractAddress, web3.utils.toWei("" + enterAmount3))
                                .send({
                                    from: account
                        })
                
                        .then(async (output) => {
                                      toast.success("Transaction Approved");
                            }).catch((e) => {
                            console.log("response", e);
                            toast.error(e.message);
                        });
                    } 
                } else {
                    toast("Minimum amount is 1 Knight Doge")
                }
            
        } catch (error) {
            console.log("response", error);
            toast.error("Error while checking locked account");
        }
    };
const DepositPlan2 = async (e) => {
    try {
        console.log("Plan 2")
        const web3 = window.web3;
        let contract = new web3.eth.Contract(abi, contractAddress);
        let tokenContract = new web3.eth.Contract(tokenAbi, tokenAddres);
            let RemainingTokens =await tokenContract.methods.balanceOf(account).call();
            let ActualRemainingTokens = await web3.utils.fromWei(RemainingTokens);
            if (enterAmount2 >= 1) 
            {
                if(parseInt(enterAmount2)>ActualRemainingTokens){
                    
                    toast.error("Oops! Your Entered Amount is greater than Your Balance");
                }
                else{
                console.log("Check Account",account)
                 let Accountinfo =await tokenContract.methods.allowance(account,contractAddress)
                    .call()
                    // account info = 300000000
                    console.log("Account Info:", Accountinfo)
                   await tokenContract.methods.approve(contractAddress, web3.utils.toWei("" + enterAmount2))
                            .send({
                                from: account
                    })
            
                    .then(async (output) => {
                                  toast.success("Transaction Approved");
                        }).catch((e) => {
                        console.log("response", e);
                        toast.error(e.message);
                    });
                } 
            } else {
                toast("Minimum amount is 1 Knight Doge")
            }
        
    } catch (error) {
        console.log("response", error);
        toast.error("Error while checking locked account");
    }
};
    const DepositPlan1 = async (e) => {
        try {
            console.log("Plan 1")
            const web3 = window.web3;
            let contract = new web3.eth.Contract(abi, contractAddress);
            let tokenContract = new web3.eth.Contract(tokenAbi, tokenAddres);
                let RemainingTokens =await tokenContract.methods.balanceOf(account).call();
                let ActualRemainingTokens = await web3.utils.fromWei(RemainingTokens);
                if (enterAmount1 >= 1) 
                {
                    if(parseInt(enterAmount1)>ActualRemainingTokens){
                        
                        toast.error("Oops! Your Entered Amount is greater than Your Balance");
                    }
                    else{
                    console.log("Check Account",account)
                     let Accountinfo =await tokenContract.methods.allowance(account,contractAddress)
                        .call()
                        // account info = 300000000
                        console.log("Account Info:", Accountinfo)
                       await tokenContract.methods.approve(contractAddress, web3.utils.toWei("" + enterAmount1))
                                .send({
                                    from: account
                        })
                
                        .then(async (output) => {
                                      toast.success("Transaction Approved");
                            }).catch((e) => {
                            console.log("response", e);
                            toast.error(e.message);
                        });
                    } 
                } else {
                    toast("Minimum amount is 1 Knight Doge")
                }
            
        } catch (error) {
            console.log("response", error);
            toast.error("Error while checking locked account");
        }
    };

// Invest Function 

const Invest = async (e) => {
    try {
        console.log("upline", upline)
        console.log("deposite", e.target.name)
        const name = e.target.name;
        const web3 = window.web3;

        let contract = new web3.eth.Contract(abi, contractAddress);
        let tokenContract = new web3.eth.Contract(tokenAbi, tokenAddres);
        // let checkuser = await contract.methods._chakUpline(upline).call();
        // if (checkuser) {
        if (name === 'planone') {
            if (enterAmount1 >= 1) 
            {
                contract.methods.invest(upline, days2, web3.utils.toWei(enterAmount1))
                .send({
                    from: account
                }).then(async (output) => {
                                  toast.success("Transaction Completed");
                                // toast.success("Transaction Completed");
                        }).catch((e) => {
                        console.log("response", e);
                        toast.error(e.message);
                    });
                
            } else {
                toast("Minimum amount is 1 Knight Doge")
            }

        } else if (name === 'plantwo') {
            if (enterAmount2 >= 1) {
                contract.methods.invest(upline, days2, web3.utils.toWei(enterAmount2))
                            .send({
                                from: account
                            })
                            .then(async (output) => {
                                toast.success("Transaction Completed");
                            
                    }).catch((e) => {
                        console.log("response", e);
                        toast.error(e.message);
                    });
            } else {
                toast("Minimum amount is 1 Knight Doge")
            }
        }
        else if (name === 'planthree') {
            if (enterAmount3 >= 1) {
                 await contract.methods.invest(upline, days3, web3.utils.toWei(enterAmount3))
                            .send({
                                from: account
                            })
                            .then(async (output) => {
                                toast.success("Transaction Completed");
                            
                    }).catch((e) => {
                        console.log("response", e);
                        // toast.error(e.message);
                    });
            } else {
                toast("Minimum amount is 1 Knight Doge")
            }
        }
        // } else {
        //     toast("Refferal Address is not Correct");
        //     console.log("Refferal Address is not Correct");
        // }
    } catch (error) {
        console.log("response", error);
        toast.error("Error while checking locked account");
        // alert("Error while checking locked account");
    }
};



    const unstake = async () => {
        try {
            const web3 = window.web3;
            let contract = new web3.eth.Contract(abi, contractAddress);
            // console.log("withrawableDepositeAmount", accountAd, account);
            let users = await contract.methods.Users(account).call();

            // console.log("withrawableDepositeAmount", users);


            if (users.withrawableDepositeAmount > 0) {
                if (users.WithdrawAbleReward <= 0) {
                    let dailyprofit1 = await contract.methods.Withdraw_Staking_Amount()
                        .send({
                            from: account
                        })
                        .then(async (output) => {
                            toast.success("Transaction Completed");
                        }).catch((e) => {
                            console.log("response", e);
                            toast.error(e.message);
                        });
                } else {
                    console.log("response");
                    toast("withdraw reward first");
                }
            } else {
                toast("No Claim available");
            }
        } catch (error) {
            console.log("response", error);
            // alert("Error while checking locked account");
        }
    };

 
    const checkReward = async (e) => {
        try {
            console.log("deposite", e.target.name)
            const name = e.target.name;
            const web3 = window.web3;
            let contract = new web3.eth.Contract(abi, contractAddress);
            // if (name === 'planone') {
            let rewards = await contract.methods.Rewards()
                .send({
                    from: account
                })
                .then(async (output) => {
                    toast.success("Transaction Completed");
                }).catch((e) => {
                    console.log("response", e);
                    toast.error(e.message);
                });
            // } 
        } catch (error) {
            console.log("response", error);
            // alert("Error while checking locked account");
        }
    };


// For amount 1
    const enter1AmountCall = async (e) => {
        const web3 = window.web3;
        // await set1EnterAmount(e.target.value);
        let tokenContract = new web3.eth.Contract(tokenAbi, tokenAddres);
        let Accountinfo =await tokenContract.methods.allowance(account,contractAddress)
        .call();
         let finalAmount =await web3.utils.fromWei(Accountinfo) 
        //  console.log("Final Amount", finalAmount)
        // console.log("Amount1",enterAmount1);
        console.log(parseFloat(e.target.value)<parseFloat(finalAmount));
        let valueEntered=e.target.value;
         if (parseFloat(valueEntered)<=parseFloat(finalAmount))
        {
            console.log("called");
            setDisable(true);
            console.log("Account info",finalAmount)
        }
        else{
            setDisable(false)
        }
        try {
            const name = e.target.name;
            // console.log("name", name);
            const web3 = window.web3;
            let contract = new web3.eth.Contract(abi, contractAddress);
            if (name === 'first_input') {
                let valueEntered=e.target.value;
                let value = e.target.value
                console.log("here",value);
                 await set1EnterAmount(value);
                 console.log("Amount 1 = ",enterAmount1)
                let check_reward = await contract.methods.getResult(days1, web3.utils.toWei(e.target.value)).call();
                // console.log("check_reward", check_reward.profit)
                set1withdrawAble(formatThousands(web3.utils.fromWei(check_reward.profit)));
            }
        } catch (error) {
            console.log("Error while checking locked account", error);
        }
    };
// For Amount 2

const enter2AmountCall = async (e) => {
    const web3 = window.web3;
    // await set1EnterAmount(e.target.value);
    let tokenContract = new web3.eth.Contract(tokenAbi, tokenAddres);
    let Accountinfo =await tokenContract.methods.allowance(account,contractAddress)
    .call();
     let finalAmount =await web3.utils.fromWei(Accountinfo) 
    //  console.log("Final Amount", finalAmount)
    // console.log("Amount1",enterAmount1);
    console.log(parseFloat(e.target.value)<parseFloat(finalAmount));
    let valueEntered=e.target.value;
     if (parseFloat(valueEntered)<=parseFloat(finalAmount))
    {
        console.log("called");
        setDisable1(true);
        console.log("Account info",finalAmount)
    }
    else{
        setDisable1(false)
    }
    try {
        const name = e.target.name;
        // console.log("name", name);
        const web3 = window.web3;
        let contract = new web3.eth.Contract(abi, contractAddress);
        if (name === 'second_input') {
            let value = e.target.value
            console.log("Amount2",value);
             await set2EnterAmount(value);
             console.log("Amount 2 = ",enterAmount2)
            let check_reward = await contract.methods.getResult(days1, web3.utils.toWei(e.target.value)).call();
            // console.log("check_reward", check_reward.profit)
            set2withdrawAble(formatThousands(web3.utils.fromWei(check_reward.profit)));
        } 
    } catch (error) {
        console.log("Error while checking locked account", error);
    }
};
// For Amount 3

const enter3AmountCall = async (e) => {
    const web3 = window.web3;
    // await set1EnterAmount(e.target.value);
    let tokenContract = new web3.eth.Contract(tokenAbi, tokenAddres);
    let Accountinfo =await tokenContract.methods.allowance(account,contractAddress)
    .call();
     let finalAmount =await web3.utils.fromWei(Accountinfo) 
    //  console.log("Final Amount", finalAmount)
    // console.log("Amount1",enterAmount1);
    console.log(parseFloat(e.target.value)<parseFloat(finalAmount));
    let valueEntered=e.target.value;
     if (parseFloat(valueEntered)<=parseFloat(finalAmount))
    {
        console.log("called");
        setDisable2(true);
        console.log("Account info",finalAmount)
    }
    else{
        setDisable2(false)
    }
    try {
        const name = e.target.name;
        // console.log("name", name);
        const web3 = window.web3;
        let contract = new web3.eth.Contract(abi, contractAddress);
        if (name === 'third_input') {
            let valueEntered=e.target.value;
            let value = e.target.value
            console.log("Amount 3",value);
             await set3EnterAmount(value);
             console.log("Amount 3 = ",enterAmount3)
            let check_reward = await contract.methods.getResult(days1, web3.utils.toWei(e.target.value)).call();
            // console.log("check_reward", check_reward.profit)
            set3withdrawAble(formatThousands(web3.utils.fromWei(check_reward.profit)));
        }
    } catch (error) {
        console.log("Error while checking locked account", error);
    }
};

    function formatThousands(num) {
        var numbr = parseFloat(parseFloat(num).toFixed(2));
        // console.log("num", parseFloat(numbr));
        var values = numbr.toString().split(".");
        return (
            values[0].replace(/.(?=(?:.{3})+$)/g, "$&,") +
            (values.length == 2 ? "." + values[1] : "")
        );
    }

    const loadWeb3 = async () => {
        let isConnected = false;
        try {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
                isConnected = true;
            } else if (window.web3){
                window.web3 = new Web3(window.web3.currentProvider);
                isConnected = true;
            } else {
                isConnected = false;
                console.log("Metamask is not installed, please install it on your browser to connect.");
                // alert("Metamask is not installed, please install it on your browser to connect.");
            }
            if (isConnected === true) {
                let accounts = await getAccounts();
                // setAccount(accounts[0]);
                accountAd = accounts[0];
                setAccount(accountAd);
                let accountDetails = null;
                window.ethereum.on("accountsChanged", function (accounts) {
                    // setAccount(accounts[0]);
                    accountAd = accounts[0];
                    setAccount(accountAd);
                    // console.log(accounts);
                });
            }
            // getData();
        } catch (error) {
            console.log("Error while connecting metamask", error);
            // alert("Error while connecting metamask");
        }
    };

    const getAccounts = async () => {
        const web3 = window.web3;
        try {
            let accounts = await web3.eth.getAccounts();
            // console.log(accounts);
            return accounts;
        } catch (error) {
            console.log("Error while fetching acounts: ", error);
            return null;
        }
    };

    // eslint-disable-next-line
    const isLockedAccount = async () => {
        try {
            let accounts = await getAccounts();
            if (accounts.length > 0) {
                // console.log("Metamask is unlocked");
            } else {
                console.log("Metamask is locked");
            }
        } catch (error) {
            console.log("Error while checking locked account");
        }
    };

    useEffect(() => {
        setInterval(() => {
            loadWeb3();
        }, 1000);
    }, []);

    return (
        <div className="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="bannercard1">
                            <div className="col-md-12" id="plan">
                                <span>Plan A</span>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <span className="bannerprofit">Daily Profit</span>
                                    <span className="bannervalue">{dailyProfit1}%</span>
                                </div>
                                <div className="col-6">
                                    <span className="bannerprofit">Total Return</span>
                                    <span className="bannervalue">{totalReturn1}%</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <span className="bannerprofit">Withdraw time</span>
                                    <span className="bannervalue">
                                        Any Time
                                        {/* {withdrawn1} */}
                                    </span>
                                </div>
                                <div className="col-6">
                                    <span className="bannerprofit">Days</span>
                                    <span className="bannervalue">
                                        3
                                        {/* {days1} */}
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <span className="bannerprofit">Enter Amount</span>
                                    {/* <span className="bannervalue">0%</span> */}

                                    <input className="stakeinput"
                                        placeholder="0"
                                        name="first_input"
                                        type="number"
                                        onChange={enter1AmountCall} />
                                </div>
                                <div className="col-6">
                                    <span className="bannerprofit">In 14 days you will get</span>
                                    <span className="bannervalue1 py-2">{withdrawnAble1}</span>
                                </div>
                            </div>
                            {/* <div class="d-grid gap-2"> */}
                            {/* <div className="row">
                                <div className="col-sm">
                                    <button type="button" className="btn btn-grad" id="ImageColor"
                                        name="planone"
                                        onClick={Deposite}>
                                        KNIGHTDOGE
                                    </button>
                                </div>
                                <div className="col-sm">
                                    <button type="button" className="btn btn-grad" id="ImageColor"
                                        // name="planone"
                                        onClick={unstake}>
                                        Claim HUTT
                                    </button>
                                </div>
                            </div> */}
                            <div class="d-grid gap-2">
                                
                                    <button type="button" disabled={disable}  className="btn btn-gradd btn-block "
                                    name="planone"
                                    onClick={DepositPlan1}>
                                    Approve
                                </button>
                                
                                
                                <button type="button" disabled={!disable} className="btn btn-gradd btn-block"
                                    name="planone"
                                    onClick={Invest}>
                                    Invest
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="bannercard1">
                            <div className="col-md-12" id="plan">
                                <span>Plan B</span>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <span className="bannerprofit">Daily Profit</span>
                                    <span className="bannervalue">{dailyProfit2}%</span>
                                </div>
                                <div className="col-6">
                                    <span className="bannerprofit">Total Return</span>
                                    <span className="bannervalue">{totalReturn2}%</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <span className="bannerprofit">Withdraw time</span>
                                    <span className="bannervalue">Any Time</span>
                                </div>
                                <div className="col-6">
                                    <span className="bannerprofit">Days</span>
                                    <span className="bannervalue">
                                        5</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <span className="bannerprofit">Enter Amount</span>
                                    {/* <span className="bannervalue">0%</span> */}

                                    <input className="stakeinput"
                                        placeholder="0"
                                        name="second_input"
                                        type="number"
                                        onChange={enter2AmountCall}
                                    />

                                </div>
                                <div className="col-6">
                                    <span className="bannerprofit">In 21 days you will get</span>
                                    <span className="bannervalue1 py-2">{withdrawnAble2}</span>
                                </div>
                            </div>
                            {/* <div className="row">
                                <div className="col-sm">
                                    <button type="button" className="btn btn-grad" id="ImageColor"
                                        name="plantwo"
                                        onClick={Deposite}>
                                        KNIGHTDOGE
                                    </button>
                                </div>
                                <div className="col-sm">
                                    <button type="button" className="btn btn-grad" id="ImageColor"
                                        // name="plantwo"
                                        onClick={unstake}>
                                        Claim HUTT
                                    </button>
                                </div>
                            </div> */}

                            <div class="d-grid gap-2">
                            <button type="button" disabled={disable1}  className="btn btn-gradd btn-block "
                                    name="planone"
                                    onClick={DepositPlan2}>
                                    Approve
                                </button>
                                <button type="button" disabled={!disable1} className="btn btn-gradd btn-block"
                                    name="planone"
                                    onClick={Invest}>
                                    Invest
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="bannercard1">
                            <div className="col-md-12" id="plan">
                                <span>Plan C</span>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <span className="bannerprofit">Daily Profit</span>
                                    <span className="bannervalue">{dailyProfit3}%</span>
                                </div>
                                <div className="col-6">
                                    <span className="bannerprofit">Total Return</span>
                                    <span className="bannervalue">{totalReturn3}%</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <span className="bannerprofit">Withdraw time</span>
                                    <span className="bannervalue">Any Time</span>
                                </div>
                                <div className="col-6">
                                    <span className="bannerprofit">Days</span>
                                    <span className="bannervalue">12</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <span className="bannerprofit">Enter Amount</span>

                                    <input className="stakeinput"
                                        placeholder="0"
                                        name="third_input"
                                        type="number"
                                        onChange={enter3AmountCall}
                                    />

                                </div>
                                <div className="col-6">
                                    <span className="bannerprofit">In 28 days you will get</span>
                                    <span className="bannervalue1 py-2">{withdrawnAble3}</span>
                                </div>
                            </div>
                            {/* <div className="row">
                                <div className="col-sm">
                                    <button type="button" className="btn btn-grad" id="ImageColor"
                                        name="planthree"
                                        onClick={Deposite}>
                                        KNIGHTDOGE
                                    </button>
                                </div>
                                <div className="col-sm">
                                    <button type="button" className="btn btn-grad" id="ImageColor"
                                        name="planthree"
                                        onClick={unstake}>
                                        Claim HUTT
                                    </button>
                                </div>
                            </div> */}
                            <div class="d-grid gap-2">
                            <button type="button" disabled={disable2} className="btn btn-gradd btn-block "
                                    name="planone"
                                    onClick={DepositPlan3}>
                                    Approve
                                </button>
                                <button type="button" disabled={!disable2} className="btn btn-gradd btn-block"
                                    name="planone"
                                    onClick={Invest}>
                                    Invest
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Banner;
