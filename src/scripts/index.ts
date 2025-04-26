// src/scripts/index.ts

// import CardComponent, { CardData } from '../components/CardComponent';
// import '../styles/pds_main.scss';

// class Main {
//   private readonly verificationLog: string = "Hello world!";

//   constructor() {
//     console.log(this.verificationLog);
//     this.loadMemberData();
//   }

//   private getMemberIdFromUrl(): string | null {
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get('memberId');
//   }

//   private async fetchMemberData(memberId: string): Promise<any> {
//     const apiUrl = `https://members-api.parliament.uk/api/Members/${memberId}`;
//     try {
//       const response = await fetch(apiUrl);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       return data.value;
//     } catch (error) {
//       console.error('Error fetching member data:', error);
//       return null;
//     }
//   }

//   private createCard(memberData: any): CardComponent | null {
//     if (!memberData) {
//       return null;
//     }

//     const cardData: CardData = {
//       imageUrl: memberData.thumbnailUrl,
//       partyName: memberData.latestParty.name,
//       name: memberData.nameAddressAs,
//       constituency: memberData.latestHouseMembership.membershipFrom,
//       endDate: memberData.latestHouseMembership.membershipEndDate ? new Date(memberData.latestHouseMembership.membershipEndDate) : undefined,
//       gender: memberData.gender, // Make sure this is still here
//     };

//     return new CardComponent(cardData);
//   }

//   private async loadMemberData(): Promise<void> {
//     const memberId = this.getMemberIdFromUrl();
//     const mainElement = document.querySelector('main');

//     if (!mainElement) {
//       console.error('The <main> element was not found in the HTML.');
//       return;
//     }

//     // Clear any existing cards
//     mainElement.innerHTML = '';

//     if (memberId) {
//       const memberData = await this.fetchMemberData(memberId);
//       if (memberData) {
//         const cardComponent = this.createCard(memberData);
//         if (cardComponent) {
//           mainElement.appendChild(cardComponent.getElement());
//         }
//       } else {
//         mainElement.textContent = 'Failed to load member data.';
//       }
//     } else {
//       mainElement.textContent = 'Please provide a memberId in the URL query parameters (e.g., ?memberId=4031 or ?memberId=4639).';
//     }
//   }
// }

// new Main();



import CardComponent, { CardData } from '../components/CardComponent';
import '../styles/pds_main.scss';

class Main {
  // A simple string for initial verification, logged to the console upon class instantiation.
  private readonly verificationLog: string = "Main class initialized.";

  constructor() {
    // Log the verification message to the console to confirm the script is running.
    console.log(this.verificationLog);
    // Call the method to load member data, which is the primary functionality of this class.
    this.loadMemberData();
  }

  /**
   * Retrieves the 'memberId' query parameter from the current URL.
   * @returns {string | null} The member ID if found, otherwise null.
   */
  private getMemberIdFromUrl(): string | null {
    // Create a URLSearchParams object from the current window's location search string.
    const urlParams = new URLSearchParams(window.location.search);
    // Get the value of the 'memberId' parameter.
    return urlParams.get('memberId');
  }

  /**
   * Asynchronously fetches member data from the Parliament API using the provided member ID.
   * @param {string} memberId The ID of the member to fetch data for.
   * @returns {Promise<any>} A promise that resolves to the member data (as a JSON object) if the fetch is successful,
   * or null if there's an error.
   */
  private async fetchMemberData(memberId: string): Promise<any> {
    // Construct the API URL using the provided member ID.
    const apiUrl = `https://members-api.parliament.uk/api/Members/${memberId}`;
    try {
      // Initiate the fetch request.
      const response = await fetch(apiUrl);
      // Check if the response status indicates success.
      if (!response.ok) {
        // If the response is not successful, throw an error with the status code.
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Parse the JSON response body.
      const data = await response.json();
      // Return the 'value' property of the parsed JSON, which is expected to contain the member data.
      return data.value;
    } catch (error) {
      // Log any errors that occur during the fetch or JSON parsing.
      console.error('Error fetching member data:', error);
      // Return null to indicate that the data fetching failed.
      return null;
    }
  }

  /**
   * Creates a CardComponent instance from the provided member data.
   * @param {any} memberData The data of the member to display in the card.
   * @returns {CardComponent | null} A new CardComponent instance if memberData is valid, otherwise null.
   */
  private createCard(memberData: any): CardComponent | null {
    // Check if memberData is null or undefined. If so, return null as we cannot create a card without data.
    if (!memberData) {
      return null;
    }

    // Create a CardData object to hold the relevant member information for the CardComponent.
    const cardData: CardData = {
      imageUrl: memberData.thumbnailUrl,
      partyName: memberData.latestParty.name,
      name: memberData.nameAddressAs,
      constituency: memberData.latestHouseMembership.membershipFrom,
      endDate: memberData.latestHouseMembership.membershipEndDate ? new Date(memberData.latestHouseMembership.membershipEndDate) : undefined,
      gender: memberData.gender,
    };

    // Create a new CardComponent instance with the prepared card data.
    return new CardComponent(cardData);
  }

  /**
   * Asynchronously loads member data based on the 'memberId' from the URL and renders a card.
   * If no 'memberId' is provided, it displays a message prompting the user to provide one.
   * If fetching data fails, it displays an error message.
   * @returns {Promise<void>} A promise that resolves when the member data is loaded and the card is rendered (or an error message is displayed).
   */
  private async loadMemberData(): Promise<void> {
    const memberId = this.getMemberIdFromUrl();
    const mainElement = document.querySelector('main');

    // Check if the <main> element exists in the DOM.
    if (!mainElement) {
      // If the <main> element is not found, log an error message to the console and exit the function.
      console.error('The <main> element was not found in the HTML.');
      return;
    }

    // Clear any existing content within the <main> element before adding a new card.
    mainElement.innerHTML = '';

    // Check if a member ID was successfully retrieved from the URL.
    if (memberId) {
      const memberData = await this.fetchMemberData(memberId);
      if (memberData) {
        const cardComponent = this.createCard(memberData);
        if (cardComponent) {
          mainElement.appendChild(cardComponent.getElement());
        }
      } else {
        mainElement.textContent = 'Failed to load member data.';
      }
    } else {
      mainElement.textContent = 'Please provide a memberId in the URL query parameters (e.g., ?memberId=4031 or ?memberId=4639).';
    }
  }
}

// Instantiate the Main class when the script is executed. This will trigger the constructor and subsequently load the member data.
new Main();