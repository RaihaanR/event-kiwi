import { QueryFile } from 'pg-promise';
import path from 'path';

function sql(file) {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, {minify: true});
}

export const event = {
  findEventDetails: sql('../sql/eventDetails.sql'),
  findEventCards: sql('../sql/eventCards.sql'),
  findEventFiles: sql('../sql/eventFiles.sql')
};

export const society = {
  findSocietyDetails: sql('../sql/societyDetails.sql'),
  findSocietyEventCards: sql('../sql/societyEventCards.sql'),
  excludeEventCondition: sql('../sql/excludeEventCondition.sql'),
  findSocietyFiles: sql('../sql/societyFiles.sql')
};

export const file = {
  findFileDetails: sql('../sql/fileDetails.sql'),
  findFileName: sql('../sql/fileName.sql'),
  insertNewFile: sql('../sql/newFile.sql')
};

