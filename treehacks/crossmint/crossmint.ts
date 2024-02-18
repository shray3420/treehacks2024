import axios from 'axios';
import queryString from 'query-string';
import { crossmintAPIKey } from '../firebase/api';


function generateID() { 
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 10) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}


export const createNFT = async (email:string, imageUrl:string) => {
    try {
      const apiKey = crossmintAPIKey; // Replace '<api-key>' with your actual API key
      const collectionId = 'educa'; // Replace '<collection-id>' with your actual collection ID
      const animationUrl = imageUrl; // Replace '<string>' with your actual animation URL
      const traitType = 'educad'; // Replace '<string>' with your actual trait type
      const value = generateID(); // Replace '<string>' with your actual value
      const recipientEmail = "email:"+email+":polygon";
  
      const options = {
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json',
        },
      };
  
      const requestBody = {
        compressed: true,
        metadata: {
          animation_url: animationUrl,
          attributes: [
            {
              display_type: 'boost_number',
              trait_type: traitType,
              value: value,
            },
          ],
          // Generate a random number
          description: 'A really awesome dog that will be with you forever!',
          image: 'https://www.crossmint.com/assets/crossmint/logo.png',
          name: 'DOGGO NFT #'+Math.floor(Math.random() * 1000),
        },
        recipient: recipientEmail,
        reuploadLinkedFiles: true,
      };
      console.log(requestBody);
  
      const response = await axios.post(
        `https://staging.crossmint.com/api/2022-06-09/collections/${collectionId}/nfts`,
    queryString.stringify(requestBody),
        options
      );
    
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  

export const createWallet = async (email: string) => {
    try {
    
      const options = {
        headers: {
          'X-API-KEY': crossmintAPIKey,
          'Content-Type': 'application/json',
        },
      };
  
      const requestBody = {
        chain: 'arbitrum',
        email: email,
      };
      console.log(requestBody);
      const response = await axios.post(
        'https://staging.crossmint.com/api/v1-alpha1/wallets',
        queryString.stringify(requestBody),
        options
      );
  
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };