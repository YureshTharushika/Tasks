-- 3.2 Select names of all empty test groups
SELECT [name]
FROM [group] g
WHERE [name] LIKE 'TEST-%'
AND NOT EXISTS (
    SELECT 1 
    FROM groupMembership gm 
    WHERE gm.groupID = g.id
);

-- 3.3 Select users named Victor not in test groups
SELECT DISTINCT u.firstName, u.lastName
FROM [user] u
WHERE u.firstName = 'Victor'
AND NOT EXISTS (
    SELECT 1
    FROM groupMembership gm
    JOIN [group] g ON gm.groupID = g.id
    WHERE gm.userID = u.id
    AND g.[name] LIKE 'TEST-%'
);

-- 3.4 Select users and gruups which user was created before the group they in
SELECT u.firstName, u.lastName, g.[name] as groupName, 
       u.created as userCreated, g.created as groupCreated
FROM [user] u
JOIN groupMembership gm ON u.id = gm.userID
JOIN [group] g ON gm.groupID = g.id
WHERE u.created < g.created;