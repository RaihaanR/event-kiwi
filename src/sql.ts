import { QueryFile } from 'pg-promise';
import path from 'path';

function sql(file) {
  const fullPath = path.join(__dirname, file);

  return new QueryFile(fullPath, {minify: true});
}

export const event = {
  findEventDetails: sql('../sql/event/eventDetails.sql'),
  findEventCards: sql('../sql/event/eventCards.sql'),
  findEventFiles: sql('../sql/event/eventFiles.sql'),
  searchEvents: sql('../sql/event/searchEvents.sql'),
  goingStatus: sql('../sql/event/goingStatus.sql'),
  setStatus: sql('../sql/event/setStatus.sql'),
  calendarListing: sql('../sql/event/calendarListing.sql'),
  postListing: sql('../sql/event/postListing.sql')
};

export const society = {
  findSocietyDetails: sql('../sql/society/societyDetails.sql'),
  findSocietyEventCards: sql('../sql/society/societyEventCards.sql'),
  excludeEventCondition: sql('../sql/society/excludeEventCondition.sql'),
  findSocietyFiles: sql('../sql/society/societyFiles.sql'),
  searchSocieties: sql('../sql/society/searchSocieties.sql')
};

export const file = {
  findFileDetails: sql('../sql/file/fileDetails.sql'),
  findFileName: sql('../sql/file/fileName.sql'),
  insertNewFile: sql('../sql/file/newFile.sql'),
  checkDeletion: sql('../sql/file/checkDeletion.sql'),
  deleteFile: sql('../sql/file/deleteFile.sql')
};

export const auth = {
  deleteTokenByUser: sql('../sql/auth/deleteTokenUser.sql'),
  deleteAllTokensByValue: sql('../sql/auth/deleteAllTokensValue.sql'),
  deleteTokenByValue: sql('../sql/auth/deleteTokenValue.sql'),
  checkTokenExists: sql('../sql/auth/checkToken.sql'),
  insertNewToken: sql('../sql/auth/newToken.sql'),
  insertNewUser: sql('../sql/auth/newUser.sql'),
  updateUser: sql('../sql/auth/updateUser.sql'),
  findUserByAuthId: sql('../sql/auth/userByAuthId.sql'),
  findUserByUserId: sql('../sql/auth/userByUserId.sql'),
  findUserByToken: sql('../sql/auth/userFromToken.sql')
};

export const profile = {
  listInterests: sql('../sql/profile/listInterests.sql'),
  listSocieties: sql('../sql/profile/listSocieties.sql'),
  insertNewInterest: sql('../sql/profile/newInterest.sql'),
  deleteInterest: sql('../sql/profile/deleteInterest.sql'),
  setSocietyStatus: sql('../sql/profile/societyStatus.sql'),
  countInterested: sql('../sql/profile/searchInterested.sql'),
  getSocietyFromOwner: sql('../sql/profile/societyFromUser.sql')
};

