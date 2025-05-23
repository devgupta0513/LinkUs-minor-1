import { Button } from '@chakra-ui/button';
import { Box, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/menu';
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Tooltip } from '@chakra-ui/tooltip';
import React, { useState } from 'react';
import { Avatar } from '@chakra-ui/avatar';
import ProfileModal from './ProfileModel';
import { ChatState } from '../context/ChatProvider';
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Spinner, useDisclosure, useToast } from '@chakra-ui/react';
import { Await, useNavigate } from 'react-router-dom';
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import Cookies from "js-cookie";

import axios from "axios";
import ChatLoading from '../ChatLoading';
import UserListItem from '../userAvatar/UserListItem';
import { getSender } from '../../config/ChatLogics';
const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();
    const navigate = useNavigate()
    const {
        setSelectedChat,
        user,
        notification,
        setNotification,
        chats,
        setChats,
    } = ChatState();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const logoutHandler = () => {
        // sessionStorage.removeItem("User");
        Cookies.remove("token", { path: "/" });

        navigate("/")
    }

    const endpoint = process.env.REACT_APP_BASE_URL;
    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`${endpoint}/api/user?search=${search}`, config)
            setLoading(false);
            setSearchResult(data);
        }
        catch (error) {
            toast({
                title: "Error Occured!",
                description: "failed to Load the SearchResult",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };



    const accessChat = async (userId) => {


        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(`${endpoint}/api/chat`, { userId }, config);

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            toast({
                title: "Error fetching the chat",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };



    return (

        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="100%"
                p="5px 10px 5px 10px"
                borderWidth="5px"
            >
                <Tooltip
                    label="Search User to chat"
                    hasArrow
                    placement='bottom-end'
                >
                    <Button variant="ghost" onClick={onOpen}>
                        <i className="fas fa-search"></i>
                        <Text display={{ base: "none", md: "flex" }} px={4}>
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
                <Text fontSize="2xl" fontFamily="work sans">
                    LinkUs
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                        <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
                            <BellIcon fontSize="2xl" m={1} />
                        </MenuButton>
                        <MenuList pl={2}>
                            {!notification.length && "No New Messages"}
                            {notification.map((notif) => (
                                <MenuItem
                                    key={notif._id}
                                    onClick={() => {
                                        setSelectedChat(notif.chat);
                                        setNotification(notification.filter((n) => n !== notif));
                                    }}
                                >
                                    {notif.chat.isGroupChat
                                        ? `New Message in ${notif.chat.chatName}`
                                        : `New Message from ${getSender(user, notif.chat.users)}`}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
                            {user && <Avatar size="sm" cursor="pointer" name={user.name}
                                src={user.pic} />}
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user} >
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>
            <Drawer placement='left' onClose={onclose} isOpen={isOpen}  >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderWidth="1px"  >Search Users</DrawerHeader>

                    <DrawerBody>

                        <Box display='flex' pb={2}  >
                            <Input
                                placeholder="Search by name or email"
                                mr={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button
                                onClick={handleSearch}
                            >GO</Button>

                        </Box>
                        {
                            loading ? <ChatLoading /> : (
                                searchResult?.map((user) => (
                                    <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => accessChat(user._id)}
                                    />
                                ))
                            )
                        }
                        {loadingChat && <Spinner ml="auto" d="flex" />}

                    </DrawerBody>
                </DrawerContent>
            </Drawer>

        </>
    );

};

export default SideDrawer;
