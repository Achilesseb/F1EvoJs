import { mockData } from "./mockData.js";
const parentElement = document.querySelector(".driverCardsContainer");
const cardContainer = document.createElement("div");
cardContainer.className = "driverCardsContent";

const filterDriverInfo = (array, toFind, teamColor) => {
  // takes the argument array from main function and searches for thtat specific information
  let filteredInfo = [];
  for (let i = 0; i <= toFind.length - 1; i++) {
    filteredInfo.push(array.filter((el) => el[0] === toFind[i]));
    if (
      filteredInfo[i][0].includes("firstName") && // For Name and FirstName to create a new container to position everything corectly
      filteredInfo[i][0].includes("lastName")
    ) {
      const driverName = document.createElement("div");
      driverName.className = "name";
    }
  }
  return filteredInfo.map(([info]) => {
    const driverInfoDetail = document.createElement("div");
    driverInfoDetail.className = info[0];
    driverInfoDetail.innerText = info[1];
    return driverInfoDetail;
  });
};
const driverDetails = (entries, toFind, teamColor) => {
  // function called in main function to create elements for specific element
  const driverInfo = document.createElement("div");
  const driverNameContainer = document.createElement("div");
  const label = document.createElement("div");
  const pointsContainer = document.createElement("div");
  const buttonsContainer = document.createElement("div");
  const increasePts = document.createElement("button");
  const decreasePts = document.createElement("button");
  const teamLabelColor = document.createElement("div");
  const driverImage = document.createElement("img");
  driverNameContainer.className = "name";
  const driverImageContainer = document.createElement("div");
  driverImageContainer.className = "driverLook";
  driverInfo.className = "driverInfo";
  filterDriverInfo(entries, toFind, teamColor).map((el) => {
    if (el.className === "firstName" || el.className === "lastName") {
      // condition to append differently the elements and add specific colors for each driver
      teamLabelColor.className = "color";
      teamLabelColor.style.backgroundColor = `var(--${teamColor}-color)`;
      driverNameContainer.append(el);
      driverInfo.append(teamLabelColor);
      driverInfo.append(driverNameContainer);
    } else if (el.className === "points") {
      pointsContainer.className = "pointsContainer";
      label.textContent = "PTS";
      label.className = "label";
      pointsContainer.append(el);
      pointsContainer.append(label);
      driverInfo.append(pointsContainer);
      buttonsContainer.classList = "buttons-container";
      increasePts.id = "increase";
      decreasePts.id = "decrease";
      increasePts.className = "button";
      decreasePts.className = "button";
      buttonsContainer.append(increasePts);
      buttonsContainer.append(decreasePts);
      driverInfo.append(buttonsContainer);
    } else if (el.className === "image") {
      //if image must create new container
      driverImage.src = el.textContent;
      driverImage.className = "driverImage";
      driverImageContainer.append(driverImage);
      driverInfo.append(driverImageContainer);
    } else if (el.className === "number") {
      driverImageContainer.append(el);
      el.style.color = `var(--${teamColor}-color)`;
    } else driverInfo.append(el);
  });
  return driverInfo;
};

const content = (data) =>
  data
    .sort((a, b) => b.points - a.points)
    .map((data, id) => {
      const teamNameColor = data.team.toLowerCase().replaceAll(" ", "");
      data.rank = id + 1;
      const driverInformationsEntries = Object.entries(data);
      const driverCard = document.createElement("div");
      driverCard.id = data.number;
      driverCard.className = "driverCard";
      driverCard.style.borderColor = `--${teamNameColor}-color`;
      driverCard.append(
        driverDetails(driverInformationsEntries, ["points", "rank"])
      );
      driverCard.append(
        driverDetails(
          driverInformationsEntries,
          ["firstName", "lastName", "country"],
          teamNameColor
        )
      );
      driverCard.append(driverDetails(driverInformationsEntries, ["team"]));
      driverCard.append(
        driverDetails(
          driverInformationsEntries,
          ["image", "number"],
          teamNameColor
        )
      );
      driverCard.addEventListener("mouseenter", () => {
        driverCard.style.borderColor = `var(--${teamNameColor}-color)`;
      });
      driverCard.addEventListener("mouseleave", () => {
        driverCard.style.borderColor = "var(--defaultColor-)";
      });
      return driverCard;
    });
let newAllTargetsContainer;
const oldContent = content(mockData);
const renderElements = (content) => {
  content.map((card) => {
    parentElement.append(card);
    card.addEventListener("click", (e) => {
      const driverPoints = Number(
        e.target.closest(".driverInfo").querySelector(".points").textContent
      );
      const newPoints =
        e.target.id === "increase" && e.target.id
          ? driverPoints + 10
          : e.target.id === "decrease"
          ? driverPoints - 10
          : driverPoints;

      e.target.closest(".driverInfo").querySelector(".points").textContent =
        newPoints;
      const allTargetsContainer = e.target
        .closest(".driverCardsContainer")
        .querySelectorAll(".driverCard");
      const target = e.target.closest(".driverCard");
      newAllTargetsContainer = Array.from(allTargetsContainer).sort(
        (a, b) =>
          Number(b.querySelector(".points").textContent) -
          Number(a.querySelector(".points").textContent)
      );
      parentElement.innerHTML = "";
      return Array.from(newAllTargetsContainer).map((newCard, index) => {
        parentElement.append(newCard);
        return (newCard.querySelector(".rank").textContent = index + 1);
      });
    });
  });
};
renderElements(oldContent);
