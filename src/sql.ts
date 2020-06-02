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
  setStatus: sql('../sql/event/setStatus.sql')
};

export const society = {
  findSocietyDetails: sql('../sql/society/societyDetails.sql'),
  findSocietyEventCards: sql('../sql/society/societyEventCards.sql'),
  excludeEventCondition: sql('../sql/society/excludeEventCondition.sql'),
  findSocietyFiles: sql('../sql/society/societyFiles.sql')
};

export const file = {
  findFileDetails: sql('../sql/file/fileDetails.sql'),
  findFileName: sql('../sql/file/fileName.sql'),
  insertNewFile: sql('../sql/file/newFile.sql')
};

export const auth = {
  deleteTokenByUser: sql('../sql/auth/deleteTokenUser.sql'),
  deleteTokenByValue: sql('../sql/auth/deleteTokenValue.sql'),
  checkTokenExists: sql('../sql/auth/checkToken.sql'),
  insertNewToken: sql('../sql/auth/newToken.sql'),
  insertNewUser: sql('../sql/auth/newUser.sql'),
  updateUser: sql('../sql/auth/updateUser.sql'),
  findUserByAuthId: sql('../sql/auth/userByAuthId.sql'),
  findUserByToken: sql('../sql/auth/userFromToken.sql')
};

export const profile = {
  listInterests: sql('../sql/profile/listInterests.sql'),
  listSocieties: sql('../sql/profile/listSocieties.sql')
};

