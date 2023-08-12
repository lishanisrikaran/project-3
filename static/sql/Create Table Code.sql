-- Create a new table to hold all CSV data once imported.
CREATE TABLE NYC_Demographics (
  JURISDICTION_NAME INT NOT NULL,
  COUNT_PARTICIPANTS INT NOT NULL,
  COUNT_FEMALE INT NOT NULL,
  PERCENT_FEMALE FLOAT NOT NULL,
  COUNT_MALE INT NOT NULL,
  PERCENT_MALE FLOAT NOT NULL,
  COUNT_GENDER_UNKNOWN INT NOT NULL,
  PERCENT_GENDER_UNKNOWN FLOAT NOT NULL,
  COUNT_GENDER_TOTAL INT NOT NULL, 
  PERCENT_GENDER_TOTAL FLOAT NOT NULL,
  COUNT_PACIFIC_ISLANDER INT NOT NULL, 
  PERCENT_PACIFIC_ISLANDER FLOAT NOT NULL,
  COUNT_HISPANIC_LATINO INT NOT NULL, 
  PERCENT_HISPANIC_LATINO FLOAT NOT NULL,
  COUNT_AMERICAN_INDIAN INT NOT NULL, 
  PERCENT_AMERICAN_INDIAN FLOAT NOT NULL,
  COUNT_ASIAN_NON_HISPANIC INT NOT NULL, 
  PERCENT_ASIAN_NON_HISPANIC FLOAT NOT NULL,
  COUNT_WHITE_NON_HISPANIC INT NOT NULL, 
  PERCENT_WHITE_NON_HISPANIC FLOAT NOT NULL,
  COUNT_BLACK_NON_HISPANIC INT NOT NULL, 
  PERCENT_BLACK_NON_HISPANIC FLOAT NOT NULL,
  COUNT_OTHER_ETHNICITY INT NOT NULL, 
  PERCENT_OTHER_ETHNICITY FLOAT NOT NULL,
  COUNT_ETHNICITY_UNKNOWN INT NOT NULL, 
  PERCENT_ETHNICITY_UNKNOWN FLOAT NOT NULL,
  COUNT_ETHNICITY_TOTAL INT NOT NULL, 
  PERCENT_ETHNICITY_TOTAL FLOAT NOT NULL,
  COUNT_PERMANENT_RESIDENT_ALIEN INT NOT NULL, 
  PERCENT_PERMANENT_RESIDENT_ALIEN FLOAT NOT NULL,
  COUNT_US_CITIZEN INT NOT NULL, 
  PERCENT_US_CITIZEN FLOAT NOT NULL,
  COUNT_OTHER_CITIZEN_STATUS INT NOT NULL, 
  PERCENT_OTHER_CITIZEN_STATUS FLOAT NOT NULL,
  COUNT_CITIZEN_STATUS_UNKNOWN INT NOT NULL, 
  PERCENT_CITIZEN_STATUS_UNKNOWN FLOAT NOT NULL,
  COUNT_CITIZEN_STATUS_TOTAL INT NOT NULL, 
  PERCENT_CITIZEN_STATUS_TOTAL FLOAT NOT NULL,
  COUNT_RECEIVES_PUBLIC_ASSISTANCE INT NOT NULL, 
  PERCENT_RECEIVES_PUBLIC_ASSISTANCE FLOAT NOT NULL,
  COUNT_NRECEIVES_PUBLIC_ASSISTANCE INT NOT NULL, 
  PERCENT_NRECEIVES_PUBLIC_ASSISTANCE FLOAT NOT NULL,
  COUNT_PUBLIC_ASSISTANCE_UNKNOWN INT NOT NULL, 
  PERCENT_PUBLIC_ASSISTANCE_UNKNOWN FLOAT NOT NULL,
  COUNT_PUBLIC_ASSISTANCE_TOTAL INT NOT NULL, 
  PERCENT_PUBLIC_ASSISTANCE_TOTAL FLOAT NOT NULL
);

-- Data Cleaning:

-- Removes the redundant columns.
ALTER TABLE nyc_demographics
DROP COLUMN percent_female,
DROP COLUMN percent_male,
DROP COLUMN percent_gender_unknown,
DROP COLUMN percent_gender_total,
DROP COLUMN percent_pacific_islander,
DROP COLUMN percent_hispanic_latino,
DROP COLUMN percent_american_indian,
DROP COLUMN percent_asian_non_hispanic,
DROP COLUMN percent_white_non_hispanic,
DROP COLUMN percent_black_non_hispanic,
DROP COLUMN percent_other_ethnicity,
DROP COLUMN percent_ethnicity_unknown,
DROP COLUMN percent_ethnicity_total,
DROP COLUMN percent_permanent_resident_alien,
DROP COLUMN percent_us_citizen,
DROP COLUMN percent_other_citizen_status,
DROP COLUMN percent_citizen_status_unknown,
DROP COLUMN percent_citizen_status_total,
DROP COLUMN percent_receives_public_assistance,
DROP COLUMN percent_nreceives_public_assistance,
DROP COLUMN percent_public_assistance_unknown,
DROP COLUMN percent_public_assistance_total;

-- Remove rows with 0 in all columns (except jurisdiction_name)
DELETE FROM NYC_Demographics
WHERE count_participants = 0
  AND count_female = 0
  AND count_male = 0
  AND count_gender_unknown = 0
  AND count_gender_total = 0
  AND count_pacific_islander = 0
  AND count_hispanic_latino = 0
  AND count_american_indian = 0
  AND count_asian_non_hispanic = 0
  AND count_white_non_hispanic = 0
  AND count_black_non_hispanic = 0
  AND count_other_ethnicity = 0
  AND count_ethnicity_unknown = 0
  AND count_ethnicity_total = 0
  AND count_permanent_resident_alien = 0
  AND count_us_citizen = 0
  AND count_other_citizen_status = 0
  AND count_citizen_status_unknown = 0
  AND count_citizen_status_total = 0
  AND count_receives_public_assistance = 0
  AND count_nreceives_public_assistance = 0
  AND count_public_assistance_unknown = 0
  AND count_public_assistance_total = 0;

SELECT * FROM nyc_demographics;