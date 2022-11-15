// 1. Install next-sanity package
// 2. Import important configuration methods from next-sanity
import {
    createImageUrlBuilder,
    createCurrentUserHook,
    createClient
} from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

// 3. Create a config object
export const config = {
    // Find Project ID and dataset in sanity.json in studio project
    // Can differ between public and .env for these to implement into different stage including dev and production
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: "2022-11-07",
    // Set useCdn to 'false if app requires freshest possible data always --> Authenticated requests will always bypass the CDN
    useCdn: process.env.NODE_ENV === "production"
}

// set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config);

// Helper function to generate Image URLS with only the asset reference data in your documents
// https://www.sanity.io/docs/image-url
export const urlFor = (source) => imageUrlBuilder(config).image(source);

// Helper function for using the current logged in user account
// export const useCurrentUser = createCurrentUserHook(config);