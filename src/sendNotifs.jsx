import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

const PK = process.env.REACT_APP_PRIVATE_KEY; // channel private key
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

const sendNotification = async (
  title,
  message,
  cta,
  img,
  receivers,
  channelAddy
) => {
  const receiversAddress = Object.values(receivers);
  const finalReceiver = [];
  receiversAddress.forEach((e) => {
    finalReceiver.push(`eip155:42:${e}`);
  });
  console.log(finalReceiver);

  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 4, // subset
      identityType: 2, // direct payload
      notification: {
        title: title,
        body: message,
      },
      payload: {
        title: title,
        body: message,
        cta: cta,
        img: img,
      },
      recipients: finalReceiver, // recipients addresses
      channel: `eip155:5:${channelAddy}`, // your channel address
      env: "staging",
    });
    // apiResponse?.status === 204, if sent successfully!
    console.log("API repsonse: ", apiResponse);
  } catch (err) {
    console.error("Error: ", err);
  }
  // apiResponse?.status === 204, if sent successfully!
};
//0xb44a29524433dBC639C35124459c741bC241d4f4
export default sendNotification;
