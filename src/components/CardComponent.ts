// src/components/CardComponent.ts

/**
 * Defines the structure of the data required to render a card component.
 */
export interface CardData {
  imageUrl: string;
  partyName: string;
  name: string;
  constituency: string;
  endDate?: Date;
  gender?: string;
}

/**
 * A class that creates and manages the display of a card component in the DOM.
 * This component displays information about an individual, including their image,
 * party affiliation, name, and constituency. It also indicates if they are no
 * longer serving based on the `endDate`.
 */
class CardComponent {
  private data: CardData;
  private container: HTMLDivElement;

  /**
   * Creates a new CardComponent instance.
   * @param data The data object containing information to display on the card.
   */
  constructor(data: CardData) {
    this.data = data;
    this.container = document.createElement("div");
    this.container.classList.add("card");
    this.render();
  }

  /**
   * Renders the content of the card component and appends it to the container.
   */
  private render(): void {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    const image = document.createElement("img");
    image.src = this.data.imageUrl;
    image.alt = "Member Image";
    imageContainer.style.borderStyle = "solid";

    // Apply border color based on gender if the gender property exists.
    if (this.data.gender === "F") {
      imageContainer.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--pds-party-1-border-color') || 'green';
    } else {
      imageContainer.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--pds-party-2-border-color') || '#2763ba';
    }
    imageContainer.appendChild(image);

    // Create a container for the textual details.
    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("details-container");

    // Create a span element for the party name.
    const partyName = document.createElement("span");
    partyName.classList.add("party-name");
    // Set the text content of the party name from the data.
    partyName.textContent = this.data.partyName;

    // Create an h1 element for the individual's name.
    const nameHeader = document.createElement("h1");
    nameHeader.classList.add("name");
    // Set the text content of the name header from the data.
    nameHeader.textContent = this.data.name;

    // Create a span element for the constituency.
    const constituencyText = document.createElement("span");
    constituencyText.classList.add("constituency");
    // Set the text content of the constituency from the data.
    constituencyText.textContent = this.data.constituency;

    // Append the party name, name header, and constituency text to the details container.
    detailsContainer.appendChild(partyName);
    detailsContainer.appendChild(nameHeader);
    detailsContainer.appendChild(constituencyText);

    // Append the image container and details container to the main card container.
    this.container.appendChild(imageContainer);
    this.container.appendChild(detailsContainer);

    // Check if an end date is provided and if it's in the past.
    if (this.data.endDate && this.data.endDate < new Date()) {
      // Create a span element to indicate that the individual is no longer serving.
      const noLongerServing = document.createElement("span");
      noLongerServing.classList.add("no-longer-serving");
      noLongerServing.textContent = "No longer serving";
      // Append the "No longer serving" message to the details container.
      detailsContainer.appendChild(noLongerServing);
    }
  }

  /**
   * Returns the main container element of the card component.
   * @returns The HTMLDivElement representing the card.
   */
  public getElement(): HTMLDivElement {
    return this.container;
  }
}

// Export the CardComponent class so it can be used in other modules.
export default CardComponent;