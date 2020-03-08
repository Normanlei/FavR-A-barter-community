import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import API from "../utils/API-Barter";
import axios from 'axios';
import ChatWindow from "../components/ChatWindow";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import RateReviewIcon from '@material-ui/icons/RateReview';
import $ from "jquery";
import Modal from "../components/Modal";


const Chat = withRouter(({ history, currUser, setCurrUser }) => {
    const classes = {
        list: {
            marginTop: "80px",
            width: 350,
            marginRight: 'auto',
            marginLeft: 'auto',
            backgroundColor: "#8693AB",
            border: "groove 1px rgb(43,41,44, 0.3)",
        },
        review: {
            margin: "5px",
            color: "white",
            textShadow: "2px 2px 4px #000000",
            backgroundColor: "#96CDFF ",
            border: "dotted 2px #077699",
            boxShadow: "2px 4px 2px rgb(43,41,44, 0.3)",
            height: "50px",
            width: "50px"
        },
        delete: {
            margin: "5px",
            color: "white",
            textShadow: "2px 2px 4px #000000",
            backgroundColor: "#96CDFF ",
            border: "dotted 2px #077699",
            boxShadow: "2px 4px 2px rgb(43,41,44, 0.3)",
            height: "50px",
            width: "50px"
        },
        sideList1Card: {
            marginTop: '80px',
            backgroundColor: '#8693AB',
            border: 'groove 1px rgb(43,41,44, 0.3)',
            borderRadius: '20px',
            maxHeight: '85vh',
            width: '100%',
            maxWidth: "380px",
            marginTop: '70px',
            marginLeft: 'auto',
            marginRight: 'auto',
            overflowY: "auto"
        },
        sideListDrawer: {
            backgroundColor: '#8693AB',
            minHeight: '100vh',
            maxHeight: '100vh',
            width: '400px'
        },
        sideListBody: {
            padding: '20px 10px 20px 10px',
            overflowY: "auto",
            whiteSpace: "nowrap"
        },
        sideListList: {
            listStyle: 'none',
            padding: 0,
        },
        sideListPList: {
            marginBottom: '10px'
        },
        sideListImage: {
            position: 'relative',
            height: 'auto'
        },
        sideListUserImg: {
            height: '60px',
            width: '60px',
            margin: '0 0 10px 10px',
            color: 'white',
            textShadow: '2px 2px 4px #000000',
            backgroundColor: '#96CDFF',
            border: 'solid 2px #077699',
            boxShadow: '2px 4px 2px rgb(43,41,44, 0.3)',
            borderRadius: "60px",
            zIndex: 100
        },
        sideListUserInfo: {
            textShadow: '2px 2px 4px #000000',
            backgroundColor: '#96CDFF',
            borderRadius: '0px 20px 20px 0px',
            border: 'hidden 1px #077699',
            boxShadow: '2px 4px 2px rgb(43,41,44, 0.3)',
            padding: '5px 140px 5px 30px',
            margin: '0 0 2px 0',
            height: '30px',
            color: 'white'
        },
        sideListUserButton: {
            position: 'relative',
            right: '80px'
        }

    };
    const [modalStyle] = useState(getModalStyle);
    function getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    const [state, setState] = useState({
        chatList: [],
        currChat: {},
        left: false,
    })

    const handleName = (currList) => {
        let tempChatList = [];
        currList.map(async (chat, i) => {
            await ran(currList, chat, tempChatList);
        })
    }

    function ran(currList, chat, tempChatList) {
        return new Promise(resolve => {
            console.log(chat);
            let selfId = chat.user1 === currUser.id ? chat.user1 : chat.user2;
            let otherId = chat.user2 === currUser.id ? chat.user1 : chat.user2;
            let tempChatObj = {
                id: chat._id,
                self: { id: selfId, name: currUser.name, image: currUser.image },//add image here later
                other: { id: otherId }
            };
            axios.get(`../api/users/${otherId}`)
                .then(data1 => {
                    console.log(data1.data);
                    tempChatObj.other.name = data1.data.name;
                    tempChatObj.other.image = data1.data.image; //add image here later
                    tempChatList.push(tempChatObj);
                    console.log(tempChatList);
                    if (tempChatList.length === currList.length) {
                        console.log(tempChatList);
                        setState({ ...state, chatList: tempChatList });
                    }
                })
        })
    }

    useEffect(() => {
        let temp = [];
        localStorage.setItem("socketDup", JSON.stringify(temp));
        console.log(currUser);
        API.findAll()
            .then(data => {
                console.log(data.data);
                let currList = data.data.filter(chat => {
                    console.log(chat);
                    return (chat.user1 === currUser.id || chat.user2 === currUser.id)
                });
                console.log(currList);
                handleName(currList);
            })
    }, [])

    //modal handler
    const [modalState, setModalState] = useState({
        open: false,
        reviewee: ""
    });
    const handleOpen = reviewee => {
        setModalState({
            open: true,
            reviewee: reviewee
        });
    };

    const handleClose = () => {
        setModalState({
            open: false,
            reviewee: ""
        });
    };

    //sidedrwaer handler
    const toggleDrawer = (side, open) => event => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        console.log(side);

        setState({ ...state, [side]: open });
    };

    const handleOpenChatWindow = tile => {
        console.log(tile);
        setState({ ...state, currChat: tile, left: false })
    };

    const handleDeleteChat = id => {
        console.log(id);
        console.log(state.chatList);
        let newChatList = state.chatList.filter(chat => chat.id != id);
        console.log(newChatList);
        API.remove(id)
            .then(() => {
                setState({ ...state, chatList: newChatList });
            })
    }

    const sideList1 = side => (
        <div style={classes.sideList1Card} >
            <div style={classes.sideListBody} >
                <h3 style={{ margin: '0 0 20px 10px' }}>Chat List:</h3>
                <ui style={classes.sideListList}>
                    {state.chatList.map((tile) => (
                        <li
                            style={classes.sideListPList}
                            onClick={() => handleOpenChatWindow(tile)}
                        >
                            <div
                                className="d-flex bd-highlight"
                            >
                                <div
                                    style={classes.sideListImage}
                                >
                                    <img
                                        src={'/uploads/' + tile.other.image} style={classes.sideListUserImg}
                                    />
                                    <span style={classes.sideListUserInfo}
                                    >
                                        {tile.other.name}
                                    </span>
                                </div>


                                <div
                                    style={classes.sideListUserButton}
                                >
                                    <IconButton
                                        style={classes.review}
                                        edge="end" aria-label="review"
                                        onClick={() =>
                                            handleOpen(tile.other.id)
                                        }
                                    >
                                        <RateReviewIcon />
                                    </IconButton>
                                    <IconButton
                                        style={classes.delete}
                                        edge="end" aria-label="delete"
                                        onClick={(e) => {
                                            handleDeleteChat(tile.id)
                                            e.stopPropagation();
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </div>
                        </li>
                    ))}
                </ui>
            </div>
        </div>
    );
    const sideList = side => (
        <div style={classes.sideListDrawer}>
            <div style={classes.sideListBody}>
                <h3 style={{ margin: '0 0 20px 10px' }}>Chat List:</h3>
                <ui style={classes.sideListList}>
                    {state.chatList.map((tile) => (
                        <li
                            style={classes.sideListPList}
                            onClick={() => handleOpenChatWindow(tile)}
                        >
                            <div
                                className="d-flex bd-highlight"
                            >
                                <div
                                    style={classes.sideListImage}
                                >
                                    <img
                                        src={'/uploads/' + tile.other.image} style={classes.sideListUserImg}
                                    />
                                    <span style={classes.sideListUserInfo}
                                    >
                                        {tile.other.name}
                                    </span>
                                </div>


                                <div
                                    style={classes.sideListUserButton}
                                >
                                    <IconButton
                                        style={classes.review}
                                        edge="end" aria-label="review"
                                        onClick={() =>
                                            handleOpen(tile.other.id)
                                        }
                                    >
                                        <RateReviewIcon />
                                    </IconButton>
                                    <IconButton
                                        style={classes.delete}
                                        edge="end" aria-label="delete"
                                        onClick={(e) => {
                                            handleDeleteChat(tile.id)
                                            e.stopPropagation();
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </div>
                        </li>
                    ))}
                </ui>
            </div>
        </div>
    );

    console.log(state.currChat);
    if (!$.isEmptyObject(state.currChat)) {
        return (
            <ChatWindow
                chatRoom={state.currChat}
                currUser={currUser}
                toggleDrawer={toggleDrawer}
                state={state}
                sideList={sideList}
                modalState={modalState}
                handleClose={handleClose}
                modalStyle={modalStyle} />
        );
    } else {
        return (
            <React.Fragment>
                {sideList1("left")}
                <Modal
                    open={modalState.open}
                    handleClose={handleClose} modalStyle={modalStyle}
                    reviewer={currUser.id}
                    reviewee={modalState.reviewee}
                />
            </React.Fragment>
        );
    }
});

export default Chat;