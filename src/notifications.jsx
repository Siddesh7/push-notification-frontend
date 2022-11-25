import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  GridItem,
  Heading,
  Text,
  Flex,
  Spacer,
  Image,
  Link,
} from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useEffect, useRef, useState } from "react";
import * as PushAPI from "@pushprotocol/restapi";
import push from "./assets/push.jpg";
import "./app.css";

export default function PushNotification(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { address } = useAccount();
  const firstField = useRef();
  const channel = props.channel;
  const [notifications, setNotification] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await PushAPI.user.getFeeds({
        user: `eip155:42:${address}`, // user address in CAIP
        env: "staging",
      });
      setNotification(data.reverse());
    };
    if (address) {
      console.log("Calling user details");
      fetchData().catch(console.error);
    }
  }, [address]);

  return (
    <>
      <Image
        src={push}
        alt=""
        width={"100px"}
        onClick={onOpen}
        cursor={"pointer"}
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        size={"sm"}
      >
        <DrawerOverlay />
        <DrawerContent
          overflowY={"auto"}
          display="flex"
          flexDirection={"column"}
          px="10px"
        >
          <Flex>
            <Heading size={"lg"} mt={"30px"} ml="10px" color={"#fc3fe9"}>
              {channel}
            </Heading>
            <Spacer />
            <DrawerCloseButton />
          </Flex>
          <div className="mt-[50px]">
            {notifications.map((noti, i) => {
              if (noti.app === channel)
                return (
                  <>
                    <Link href={noti.url}>
                      <GridItem
                        w="100%"
                        pl={"10px"}
                        py={"10px"}
                        bg="gray.100"
                        border={"0.5px"}
                        my="5px"
                        borderRadius={"10px"}
                        key={i}
                      >
                        <Heading size={"md"}>{noti.title}</Heading>
                        <Text fontSize="md">{noti.message}</Text>
                      </GridItem>
                    </Link>
                  </>
                );
            })}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
