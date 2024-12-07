// https://adventofcode.com/2024/day/4

// lvl 1

const directions = [
    [-1, 0],  // Up
    [1, 0],   // Down
    [0, -1],  // Left
    [0, 1],   // Right
    [-1, -1], // Top-left diagonal
    [-1, 1],  // Top-right diagonal
    [1, -1],  // Bottom-left diagonal
    [1, 1]    // Bottom-right diagonal
];

function findXMAS(input) {
    const inputArray = input.split('\n').map(line => line.split(''));
    let xmasCounter = 0;

    for (let i = 0; i < inputArray.length; i++) {
        for (let j = 0; j < inputArray[0].length; j++) {
            if (inputArray[i][j] == 'X') {
                for (const [dx, dy] of directions) {
                    const checkXMAS = [
                        [i + dx, j + dy],             // Check M
                        [i + 2 * dx, j + 2 * dy],     // Check A
                        [i + 3 * dx, j + 3 * dy]      // Check S
                    ];

                    if (
                        checkXMAS.every(([x, y], index) =>
                            x >= 0 &&
                            y >= 0 &&
                            x < inputArray.length &&
                            y < inputArray[0].length &&
                            inputArray[x][y] === 'XMAS'[index + 1] // Match M, A, S
                        )
                    ) {
                        xmasCounter++;
                    }
                }
            }
        }
    }

    console.log(xmasCounter);
}

// lvl 2

function findMas(input) {
    const inputArray = input.split('\n').map(line => line.split(''));
    let xmasCounter = 0;

    const rows = inputArray.length;
    const cols = inputArray[0].length;

    for (let i = 1; i < rows - 1; i++) {
        for (let j = 1; j < cols - 1; j++) {
            if (inputArray[i][j] === 'A') {
                const topLeft = inputArray[i - 1][j - 1];
                const topRight = inputArray[i - 1][j + 1];
                const bottomLeft = inputArray[i + 1][j - 1];
                const bottomRight = inputArray[i + 1][j + 1];

                // Case 1: 
                if (topLeft === 'M' && topRight === 'S' && bottomLeft === 'M' && bottomRight === 'S') {
                    xmasCounter++;
                }
                // Case 2:
                if (topLeft === 'S' && topRight === 'M' && bottomLeft === 'S' && bottomRight === 'M') {
                    xmasCounter++;
                }
                // Case 3:
                if (topLeft === 'S' && topRight === 'S' && bottomLeft === 'M' && bottomRight === 'M') {
                    xmasCounter++;
                }
                // Case 4:
                if (topLeft === 'M' && topRight === 'M' && bottomLeft === 'S' && bottomRight === 'S') {
                    xmasCounter++;
                }
            }
        }
    }

    console.log(`sum of x-mas: ${xmasCounter}`);
}

// cases to track:

//   1                2               3               4

// M   S            S   M           S   S           M   M
//   A                A               A               A
// M   S            S   M           M   M           S   S


const inputTest = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const input = `SMXMMAXXXXMMMMSMMASASMSXMMAMSSMXSMMXMASAMXXMAMXAXXAMXAXASMSMSMMMSXXSXSXXAAMXXSXMASMAASXMXMSSMXXXXMMSSSMXSXXMASXMMSMSXMXSSMXSMMMSXMSAMSASXSAM
MASMMSXMMMMAMSMAXSAMXAXAXXAXSASAMASMMASAMAXMAXMMSXASMMMMSAAXAAAAXSMAAAAMAMXSSMMXMASMSAMXSAAAMSMMMSMAAAMMMXMXAXASAASXASAXMASMAAXXAXMAMXXSSMAM
MAMAAMXMAXSASAMMMXAMMMMAMMSMSAMXSAMXMASAMMSXSASAMXSMAAAMMXMMSMMXMAMSSMMAAMAMAXAAXMAMXAMSAMMSMAXAAAMMSMMAAXSMMSXMSMMSAMXSXMXXMMSSMMMSMMXMASXM
MAMMMXAMXMXXSASXAXAMSXMXSAAXMMMXMXSXMXSMMXMAXAMXXXXXSSSSXAMXXAMMAMXAXAXSAMMSMMMSMMSMSAMAAXMAMXSMSXXAXMSSSSMAXSAMXMMMSXAXAXAMMXMASXAMAMSXAMMX
SSSXXSMMSMMXSAAMSSSMMXSAMMSMMMMMMASASAMASMMMMXSSSSMXMAMMMXSASAMXXXSXMMMMASXAXASAMMAAMXMSMMSMXMXXAMXXSMAMMXMAMMXAAXMAMMSSMMXXAASAMMXSAMAMSSMM
AAXMASMAAASAMXMAMMAAXXMASAXXMAAAXMSAMXSAMAMXSAAAAXAAMAMAAXAMMMMSMAXMXSASAMMMMMAASMMSMAMAXXXMASAMXSAAMXAXMASXMSASMSMMMMMAXAAXSXMASAMSAMMXMAMA
MXMMAMASMMMXSXSASXSMMMMXMMSASMSMSAMXMXMMSSMAXMMMMMSXSASMSSMXXAAAMAMXMAMMAMXXAXSXMASAXSSSSMMSASAMASMMMSMSXAXXAAXXAAMAAXSMMMSMMAMMXXAMAMXMSMMS
MMXMAXXMMMAXMXMASXAXAAMMMMSAMXAMXMMAMXMMAAMXSXMXAAAASASAAXXSSMSSSMSSMSMSXMXXSXMXAXSMMMMXMMAMXMAMAMXAMAAMMMMMSMMMSMXMSMMXMXMAMMMSMMSSXMAAAXAM
MAASMXSAXSSMSAXXMMSSSMMAAAMXMMXXAXSXSASMSSMAMASMMXSAMXMMMXSAAMMXMAMAAAAXAASMMASXSMXXAAXMMMSSMSXMSSSXSMSMASAAAXMAMSMAMAMMXASXMSAMAAAMASXSMMSS
ASAMMAMXMXAAXMSAAXAAAASMMXSAXAMXMXAAAASMXMMASAMAAAMASXXMXMASMMMAMAMMSMSSMMXASAMAMAMSSMSAXMASAAXMXAXASXMXAXASMSMASMMMSAMXSASAMMASMMSSMMAAXAAS
MMAMMMSMSSMMAAMASMMXMASAAASASMAASAMSMXMXAXSAMASMMXSAMAMXAMXXMAMXSAMAXMAMAASAMASAMAMXAASMMMAXXMXMASMXMASMXSAMAXXXXAAAMAMAMXMAMAAMXMAMXMXMMMMS
XMAMSXMAAAXSXSMAMMXXXXXMMXMMMMSAXAXAXMMMMXMASAMAAXMXSAAMSSMXSSXMMMSSSMSXXMMXSMMXSXSMMMMAAMMMMSAMAXXXXMMAAAXMXMMSXSMMXAMXSSMSMMXXXMAMAMXMAMSS
SMSMXAXMMXMSMAMASXSXSAMXMAMMSXMASMMMAAAAXAMAMXSMMSMXSXSAAAMXMMXSAAAXAAAXMMSASAMXXMXMXSXSMSXAASAMSSMSAXMMMSXXXASAAXAMSSMMMMAAXMASMMSMSMSXXSAX
MAAMXSMMSXAXSXMMSXAAXMMASMSAXAMAMAAXMXSSSSSMSMAMXMMMMMMMSXMXAAAMMMSSMMMSMAAAMMAMSMAMAXAXMMMMXMAMXAAMAMXMXMXXMSMMSMAMSAAAAMMSMMMXAAXAMASAMMMM
MSMSAAAAAMSMMMXXXMMMMMSXSAAMSSMASXMMSMAMAMXMAAAMXMAXAASXMASXMMXSAMXMAAAAMAMMMXMMAMAMSSMSAMMXMSMMSMMMSSXXAAXMXAMMXXXMSXMMXMXMAXSMMMMAMAMAMAAX
XAAMXSMMMSXMMASXSMAXAAAMMMXXAXMAXAAAXMAMAMASXSASAMSSSXSASXMASAMMASASXMSAMXSXXMASASAMXMASAMXAMAXAAAMAXAASMSXMSMSAMXMMMMSMMMSMMMXAASMSMSSSSSSS
SMSMMMMSMXMAMXSAASMSMSMXAXMMASMXSSMSSSMSASMSAMAMAAMAMXSAMASXMAMSAMASXMAXMAMMAMXXASASAXXMXMSMSMSSSSMMMMMXAAMXAXMXMSAMXAAAXASAAMSSMSAXAXAAMAMM
MXMAAMAMAASAMAMXMMXAMXXSMSMMAMMAMXAAAAXSASXSASXXMMMAMXMAMXMXSAMMMMXMAXXXMASMSMSSXSAMMMMSSMMXAAAAXAAXAXXMMMASMSSSXMSSXSXSMASMMMAMXMMMSMSMMAMM
XASMMSASMMSASXXAMXAMSSMXAAAAASMMSMMMSMMMAMMMAMXXMXSSMMSAMAXXMMMAAMXMASMMSMXMAAMSAXXXXMAAXAAXMMMSMSMSMSAXAMMXXAAMAMXSAAAXMXMMMXXMXMXAXXAXMXMM
SMXXXMXMAMXAMXXSSMMXSAMMSMSSXSAMXXAMAXAMAMXMMMSXXAAAAXMAMAMXASMSSMXAAXAAMAMSMSMSXMASMMMSSMMXSAAXXXAXAMMXMSXSMMSMMSAMXMMSXAAAMAXMASMMMMMMSMSM
SAMSMMSSSXSAMXXMAAXXMAMAXMAMASAMXSASAMMMMMMXMMXAMSSSXMSAMXXSAMMMMAMSAMMMMAMXAMAXMAMXXAMAXXAAXMSMMMMMSMSMXMAXXAAMAAAXAMXXXMSSSMAMAXASAAAAAMAX
MAMSAMAAXMMAMXMSAMXSSMMSSXMMMMXSASXMAMMSMSMAMSMSMAAAXASASAAMMSAAMSMAAXSASASMSMAMSSXMASMMASMSSXMAXXXAXAAMAMSMXSXSMSMMAASAXMAMAMMSMSASMSMSSSMX
SAMMAMMSMSMSMAXSASAMAMXXMAMXMASMMSMMSAAAAASASXAXMMMMXMXAMMMMAMXMSMXMSMSASAMAAMXMAMAAAXAMAMMXMASXMASMMMMSASAMXMMMXAXXXMSAMXASMMAAXXXXXXMAXMXX
MXMXMMMAAAXAMXMMXMMSAMXMSSMAXMXMAMXAMXSMSMSMSMMMMSMSSSSSMXXMAMSSMXMMXAMMMMXSXSMMMSXSSSXMAXMASAXMAMAAASXSXSASXXAXMASMAXXMXSXMAMMSSXMSMSMXMXMS
SMSAMASMSMSXXAMMAXXSXMAMXMASMXAMAXMASAXXXAMAXAXAXAASAAXMAXXMAMSAMXAAMSMXSMXMASAAMXAMAMXSAXSAXXXXMSSSMMXXASMMMSSMMAXXXMASMXASMMSAMAXMASAXSAMX
XASXSASAAXAMMSXMMSMMSXMSASXMXSMMMSMAAMMMMMMMMMMMSMSMMMMSAMXMXXSAMXSXXAXAAXSSMSSMXMSMMMMMMXMASMSMAAXMMSSMAMMAAMXAMASMMSSMASAMXMMAXXAMXMAMSAMS
MXMAMASXSMXSAXASAMAASXMSAXASAMMSAAMMSXAXASASAMAMAMAMASMSXMXMMMSAXAMMMSMMSXMAXMASMSMSXXXAXSMMXAAMMMSMAAXMAMMXSSSXMXSAAXXXXMXSXXSMMSMXAMMMSMMA
AAMAMAMAXXAMMSAMASMASAMMAMSMMAAMXMMSMXMSMSASXSAXMSASASAMXXAXAAMMMXSAAXAXMMSMMSAMXAMSXXMASXMMMSMXSAXMMSSSMSAMAAAASXMMSMMMXMAAMMSAMASMXSAAXAMX
SXSXSXMMMMSSXMASMMMXSAMMAMXAMMSSMMSSMSMAAMAMASASASASXMAMXSMSSSMMSASMSSSMAAXSXMXMSXSMAMSMMAXMAAXMASMXAXXMASMMSSXMXAXSMXAAAMAMSASAMAMMMSMSMMMA
MAMAXAMSSXXAXMAMXMSMSXMXMXSXMAMAMMASAAXAMAAMMMAXAMAMXMAMXSAAAAAAMXSAAAAMMMSMXSSMAMAMAMAASMMMSXXAXXXMMSMMMMXAAAMXXMMMASXSXSSXMMSXMAMAASXXAMXM
MSSMMXXAXMSMXSAMXMAASASASXSSSXSAMXMMSMMMXSSSSMSMXMSMMSSSMMMMMMMMSMMMMMMMAXAAXSASASAMXSMMAASAAAXSAMXXAAAMMXMMSXSAAMAMMMXXMAMAMXMMSSXMMSASMMAM
AAAMMXXSXMXXASMSAXMSMAXASAMASAMXMSXAMXASMMMAMAXAXXXAAAAXAXXXXMXMAXXMASXSSSMSMSAMXSASXXMASMMMXSXMASMMSMSMMXSXAMMMMMASMSAMXASAMASXAAXSAMXMXSAM
MSSMMMMMXSMMMSASXSSMMMMMMXMAMSMAMXMMSSMMAAMAMMMMSSSMMMSMSXMMSMASAXMMMXMAXAAAAMAMXSAMXXSAXMASAMMSAMMAMSMASMMMMXSAMMXMASASXMSXSSSMMMMMASMMXXMX
MXAAAAAAXMAMSMMMMXXAAXSXMXMASMSMSXXAAAMSSMXMSMXAAAAAMAXXMASAMSMMMXSAAAMMMMMSSMMMXMAXSAMXSSXSAMAMSAMXMASAMAAAXXMASAMXMSASMASAXAMXSAAMAXAMXMSA
ASMMSSXMMMAMMAMXAMSMMSMAMAMXMXAMXMXMMSMAMXAXAMMMSSSMMASAMAMAMSXXAAMMXXMXMMAXAXXSXSMXMAMAMAMSXMXSMMSMSMMMSSSMSXSAMXMXAMAMMAMAMAMAMMMMMSMSAAMX
MSAMXXXASMSSSSMSSMXAMAXSSMSAXSXMAMMSAMMASMMXAMMMAMAAMMMMMASMMMMMMMSSMSMAMSMSMMMMASMXMXMXSAAMASXMMMAAAXAMAAAAXMXMMAMXMMXMMSMMAMMXMAXXXAAMMSMM
XSAMAMSAMAAAAXAMMXMASAMXAAMXMAMMASAMMXSASAXXSMAXASXMMMSMXASXASXMSAAAAAMAMAAAXMXMAMMXMAXASXMSAMAMXSMSMMMMMXMAMXAASASMXMXSAXAMXMAMSMSSMMSMAAXX
XXXMAXSXMMMMMMSMMAAMMAMSMMMMAMASMMMSMAMSMXMAXSXSAMXAAMAMAMXMXMAAXMSXSXSASMSMSSXMASXASMSMXMXMAMXMASAMASXMSMXXAMMMSASAAXMMASMMAMAMAMXAAXMASMMM
XMSSSXSAXMAMXMXASXSXSAMMAMMAMXXAXAMSMAXAMAMMMAMMMMMSXSASMMSXSMMMAMAAXMSAMXAMXXAMASMMAAXMASXMAASMMSASAMSAAXMSSSMAMMMXXSAMXMASMSSSSMSSMMXAASAM
AXMAMASAMMASAMSMMSXMSAMXAMXSXSMXMMSSSMSMXAXAMXMMASXAAMASMAAASXMAAMMMSAMAMSMSAMXMASASMXMSAMAAAXXAXSXMASXSMSAAAAAXXAXXMAMSASXSMAMAMXMAMXMMSMSX
MSMMMMMMMSASXXAASAMAXAASMMMXAAMASMAXXXAXSSSMSASAAXMMSMXMMMMXMASXXAXAMAMXMAAMAAXMXSAMXMXMASMXSSSMMXXXMMMMMSMMSMMSMSMSAMASASXXMAMAMMMAMSXXMAMX
AAMXAXAXMAMMXSSMMASMMSMAMAMMAMMAMMSMSAMXMMAASASMAMMAXMASAMXXSXMMMMMMMASMMMSMXSMSMMMMXMAMMMXAXMASASMMSAAMASAXXAAXAAASMSAMXMAMSMSASXXAMXMMMAMM
SMXSASMSMSAMXAMXMAMXAMXMMAXAMXMSSMAAXMXMSMAMMXMXXAMXMXMAMAMXMAXSAXMAXXSAAAMAMAAAMAMMMMMSMAMMMSXMXXAASASMASXMXMMMSMXMXMASMXSAAXAAAMSMMAMXMAMA
MXMAMMMAAXASXSSXSAMMSMAXSSSSSSXAAMMMMMAMAXAXSMSASXMSXMMMASXMSAASXMMSSXMXMXXAMMSMSASMSAAXMAMXAMASMSMMMAAMMMASXXXAXXXMSMXMXAMMMMMMMAAXXASMSSSS
MASXSAMXSSXMMXAXXAXAASXXMMAAAMMSMMXAASASMSMSMAMASAASAMAMAXAMXMMMXSAAXAXSMSSXMXMXSASASMMMSSSXMSAMXAAMMXMSXSAMXMMMMMXMAXMXMXSAASXSMSMSSMSAXMAX
SAMAMXSAXMASXMSMSSMXMAMXSMMMMMAAASMSXSXXXAXAMXMXSXMMAMXMMSMMXXXAAMMMSSMSAXAAXXMAMAMMMMSMAXAMMMASXSMXMSMAAMMMAXAAAAMXMSAMXSSXXXAXAAXXAAXXXMMM
MASMMMMXSMMSXSAAXAAMXSSXMASXSXMMSMAAXMASMMSXSXSXSXMMMMAAMAXXXAMMMMMXAMAMMMSMMAMSXSAXXXAASXMMSSXMAXXMXSMMSMASASMSMXSAAAXASMMXMMSMSMSSMMMMMSXA
XMAMXXSMXAAMMSXSMMMMMMAXXAMAXAMSAMXMSMAMAAAASAMMSXSAMSSMSASMMSAAMMSMMMAMXAAXAMXXAMXMASMSMAAAXXMMMSMMAXMAAXXMAMAAAASMMSMSMSAASMXAMXMMMSAAAMXS
XMASMMXAMMMSASAXXXMSAMXMASMMSSMAMXAXXXXXMMMMMAMASASAMAAXMAAAXASXSAMASXSSMSSSXMAMXMAXXAXAXMMMSXSAAAAMSSSSSMSMMMSMMMXMAXXAXMSMSAMMMAMAAXXXMMMM
XMAMASMSXMAMMMAMXMASMSXSXXAXAXXXMXMSSMMMXAASXSMMSASXMMSSMSMSMMMMMASMSAXXAAXMMMASAAASXSSSSSSXSASASMSMAXMAXAMXMAXAXSAMXSAMXMAMMMMASASMXXSSXSAS
MMASXMAXAMMSAMAMASXMASAXAMSMSSSSSSMAXAAASMMSAMXXMAMAXSAXAXXXAAAXSXMAMAMSASASXSXSAMXSAAAXAAMAMMMAXAAMXSMAMXMAMXMAMXASAAAXMXASXXSMSASMSAAMMMAS
XSAXAMMSXMXMASASASAXSMMMMXAMXAAMAAMASMMMXAAMAMXMMXMXSMMSAMASXSSXMAMXSAMXXMASASXMAMMMMMMMMMMAMAMXMMMSAXMASMSMSSSMMSSMMMMMMMASAMXXMASAAMXSXSAS
MMXXAMXSAMMSAMXMASMMMAASMMSSMMMMSMMASASMSMMMSMSMSSSXSAAMASXXMXXASMMAXXSXXMSMMMASMMMAAAXAMSXMXSSMMSAMMSMXXAAAXAAAMXMASXMASMSMMAAXMSMMMXXAXMAM
AAMSMMAXAXAAMMMMMMMMSSMSAAMXMMMXAMMXSAMAAXXXAAXAAAXASMMSAMXXSASMMMMMSMMMSSXASMAMAASXSSMMMASMAXAAAMASASXSMSMSMSSMMAMAMXMAMXXAMSMMMMAASMAMXMAM
MXMAXMXSMMSXMAAMAAXXMASMMSMAAASMMSMAMAMSMSSSMMMMMSMMMSMMAXSAMASAAXAAAAAAXXSMMMASMMMMMMAAAAAMMSSMMSAMAMAAAXAAAXAAMAMAMXMMXSSMMMMAASMMSXAXASAS
AMSSSMASAAAASXMMMSMSXMASAAXMMXMAAAMASAMXXAMASXSAAXXSASMMAMXMMAMMMMMSSSMSSMMMAMXMASXXAMXMMXSMXAAXAMAMAMMMXMSMSSMMSSSSSMSAXXAXMASXMMAMMMXMXSAS
XAXAXMASMMSXMAMSXXASAMXMSSXSSMMMMMSASMSMSMSAMXXMXXAMAMMSAMXSMMSSMXMAAXAMAAAXXXSXAXXMSSSMSMXXMMSMSMSSSSSSXAXAAAAMXAAMSAMXXSAMXAXMAMSASXSXMMMM
ASMSMMASXMMXMAAAAMMMXMMMMMMMMAASXMMAXAAAMXMAMSSMMSMMSMMASXAXXAAMAAMMSMSMSSMSSXSMSMXXAAAAXXSMSMMAMSAAAAAXMASMSSMMMMSMMMMXMAMAMMMMMXMAAAXMASAS
MAAXXXAXAXSXSMSMMMSMASAAAAAMMSMMAXMSSSMSMSSSXAAMXAAAXMSAMMSSMMSSSXSAMXXAMXAXMAMAMMMMMSMMMMAAAAMAMMMMMMMMMMAMAAAXXAXAMXMMMAMSMXASXSMMMXMASAMS
XMSMSMMXSMSAXAMXAAASAXXSSSXSAMASMMXAXAAXMAAMMSMMXSMMSAMASAAAXAXAAXMASMSMSMSAMXMAMMAAAAMAAAMSMSMSMMAXAAXMXSMXSSMMMXMXMSAASASXMSASAAXAXSAMAMXX
MXXASASAMXMAMSMSMSMMSSMMXMAMMMXMXMMMSMMMMMSMAMXMAMAMMXSSMMSSMMMMMXSXMASAXXMAMXMASXSMSASMSSMAMMAXAXMXSSSMAMXAXAMMSMSMMXMMMMMAXMMMMMMSXMASMXMA
MXXMMAMXXMMSXAAXAXXAAMXSAMXSSSXMXSAMAXAAXXXMMSAMASXXXXSXAAAAAXSXXXMAAMMAMXXMMSSMSMXXMXSMAXXAMSASMMSMMAMMAMMMMXMASAAASMMXAAMXMAXSAMAXXMAMXAAA
MSMSMSXMASMMSMSMMMMMMSASASAAMXASASASASMSSMMMASAMMMMMMMMSMMSSSMMXASMAMSSMSSMAMAAXSASASASMAMXMMSXXXAAAMSMSASXSASMAMXXMMAMMSMSMSSMMAMSSSMXXMMMM
XAAAAXAXAAXAMXAAXXXAAMASXMMSMSAMASAMMMXXMAAMASAMSSMAAAXAMAAXMAXXMASAXXAAAMSAMMSMMXMAMXSMASXSASAMMSMMXAAMASAXASMASXSMSSMAXASAAXXSAMXAMAASXMSS
XMMMXXXMSSMMSSSSMMMXXMAMAXXAMXAXAMMMMSMSSSMMXXAXAAXXMSMMMMASMXMSXMSMXSMMMXSMSXMXMAMAMXMMAAAMASMAAAMASMSMAMMMMMMXSAAAAXMXSAMMMMMMSXXMXMASAAAM
XSSSMSAAAMXAAMAXAXASMMSSMSSSMSSMXXXAXAAMAAASMSSMSSMMXXAMAXAMXXSXAMXXAMXSXXMASMSMSXXAXXSAMMMMXMXMAXXXMAXAMXSAAASAMMMMMMMXMXMAMXMAXMMXAXASMMMS
AXAAASMMMSXSMSAMXMMSAAXAXAAAMAXXXSSMSMSMMMMXAAXAMXXSASAMSMSXSXMXAMAMXSXXMMMXMAAXMAMSXMMXSMMXXXMSMSXMXSXMXAMXXMMASMXXSXSASASASMMAMAMSMSASXSSX
XMMMMMXXXAAXXMASXSXMXMMSMMSMMMMAMASAAMAAXAXMMMMMMAMMAMMMMAMXSASXSMXMAXMAXAXXMSMMMSMXASMSAMXAMAMAAAXMMXAMMMSMSSSMMMSMMASASASAMAMXMAMXAAAMAXXS
SAAAXAAMMMMMMSAMAMMSSMMXAXXMASASMAMXMSSSMSXAXAXAMAXMAMMAMAMAMAMAMASXMSSMMSMMMAMXMMAMAMMXXXAAAAXMSMMMAMAMAMAMXAAXXMAMMAMMMAMASXMSSSSMMMXMXMXM
ASXSSMMMAAAAAMMMSMSAXAASXMXMASAXMSSMXXMAAAASXMXSSSSSSXMASAMAMAMXMAMAXAAAXMAMSMSAAMAMSMMSMMSMSMSMAXAMSSSMXSASMMMMMSSMMASAMXSAMAAXAAXMXMMXMASX
MMXMAAASMSSMSXXAAXMASMMSXXXXXMMMMAAAXSXXMMAMAAAXMMAAMMSASXSSSMMXMASXMXMMMMSMMASXSMMSAAMAAAAAAAAMMMSMAAAXAXASMXAXXAAXSASXSASXSMMMMMMXAXMAXXXM
XMASMMMSAAAMXMMMXMXMXAAMMSSMMSMMMSSMMSXMXXXSMMMSAMMMMAMAMAMAMASMSASMMMASXAAAMAMSMAMAXXMMMXSSMSMAXAAMMMMMMSMXMSXSMMSMMASAMAXAXXAAMAMSMSSSXMAA
XXAMAAAXMXMMXAAAAMASMXXSAAAAAMAMAXAXAXAMMSMSXSXSAMAAMXSXSASMSAMAMASAASMXMXMXMMMXXAMMMMMXSAMAXXMMMSXMAAMAAAMAXSXMAAAAMXMAMMMSMSSSMAMAMXAAASMS
SMSSSMMSSSXMSSMSMSASAAMMMSSMMMAMMXAMSSXMAAMSAMXXXMSXXMAASASXMXSSMMMMMAMAMASMSMSSSMSXSAMAMAXSAMXXXAAXSSSSSSSMMSXXXMSXMXMASXAMAXMAXXXAMXMSMMAM
MXMAAASAXMAMAAMAAMAMMAXAMXAAASXSSMMMMXAMSMSMMMSMXMXSMAMMMMMMMMMAMSAXXMMAMMAAAAAAAAAAASMSSSMMAMSMMMSMAAXMAMAMAMMMMXXXSSMSSMXSSSSSMMSSSXMAMMMM
MSMSMMMMSSSMSSMMSMXMAMMASXXMXSMAXAAASXMMXXXXMAMSXSAMSXMAMXAASXSSMMXSMXSSSSMSMMMSMMMSMAMAAXAAAXAAXAAMMMMMSSSMMXAXAAMXMAMAMMASAMAMAXAXMASASAMX
XAAAXXAXMXAMXAMAAXXMAMSMMMASASMSMSSMSAMAXMXMASXAMMAMAMMSASMXSAMASMAXAMXAAAXXMXXAMAAMXAMMSMXXMSXXMMSMMASXAAXAXSSMSASXSAMAAAMMMMASAMXMXMXMMMMM
SMSMSSSSMXMSSXMSMSSMAXAAASMMAMAAMXMXXAMSSSXXAXMMMSMMXSAMXAXAMMMAAMAXMAMMMMSMSMSMSMSSSSSXXMAAXMMSSMXAMASMSMMXMXXAMAMMMXXSSXMAMMMXMAMSXSAMSMSM
AMAAMAAXASXAAAXAAMMSMSSXMXAMXMSMXAXXSXMXAMMMXXAXAXAAXMASMSMMSXMSSMMMSAMXAAAAAXSMMMAAAAAXAMXSXAAAAASAMAMAAXMAXAMMMAASXAMMAMSASAAMASMAAMMMAAAS
MSMSMMMMMMMMSSMXSMASXAXSSMMSAAMASXSMASAMAMMAMMSMSSSMXSAMAXAXAAMAMAAAMAMSMSSXSAMXSAMMMMMSASAAMMMSMMMMMMSSMMXAMMSSMSXMMXSMAMSASMSMMMMMSMSSMSMS
XAMXMSXMXAXXAAMAMMAMMXSAXAAXMMMAXAAAAMXSAMMMSAXAAAAMMMASMSXMSMMASMMMSMMXAXXAXASASAXMXMXMAMMXAXAAMAAAXAAAXSMMSAAMMXAXSAAMMMMMMMXXAXXAAAXMAAAX
AMXXXAASXMSSMMMXSMMSAMXMSMMSSXMXMSMMXSXSASAAMMMMMSMMSXAXAMXMAXSAMXXXAAXMSMMSMMMXSAMXASAMXXAASMSSSSSSMMSMMASAMXMSASMMMXSXSMSASMMSSMASMMMMAMSM
MSMSMSMMSAAXXXMMSAMXMAAXSXAAXXSSMAMSMSXSAMXSMXMAMAAAMMMSMXMMAXMASMXSSSMAMMAAAXAXMMMSMSMSXMAXXAMAAMAMAMMMSAMMXMXMAXSAMXXAMXSASMAAAXAMXSAMXMXM
XXAAAAXAMMSSMASAMAMMSMSXSMMSMMAXXASAAMAMXMSAMAMAMSXMSAMAXSMMSSSMAMXAAXMXMMMSSMSSMAXXMSXMAASAMXMXXMAMXSSXMAXXAMAMMMSXSAMAMXMXMMXSMMSAMXSSXSAS
MSSMSMMMXMXAMMMSMXMXSAMASXMAMMASMMXMXMAMAXAMSAXAXXAMSASXMXAAAXXMAMMXMMXSAMAMXAAAXMSAXMAXMAXAMMMASXXSAXMAXXMXASASAAXXMXSAMMMAMAXXXXMAXSAMASAS
XAAXMXMAAXSSMMAMXAMAMAMAMXXAXMAMAASXSSSSSSMMSMSMASAMSAMXMMMMSMSMSSMAXAMSAMSXMXSAMXMMMSMMMSXSMAMAMSAMAMSSMMSXASXXMXSMAMXAMAXASMMSMXSSMMAMAMXM
MSXMXAMSMXAMXMASXXMAXAMSSSMSAMXSMMMAAXAAXAAAXMAXMMMMMAMXMASAMAASMAXAMXMMXMXAMMMXMASMMMAXXXAXSMMMSMXMXMAMAAXMXMMXSSMAASXSSMSAMMAAMAMXXSXMSSSS
MMXMSXMAXMAMXMASMMMMSASAAXAXMAMMXAMMMMSMSSMMSSMSSXSASAMXXAMASXMMSAMXAAAXMASXMXMSXAAAAMAMMMMMAMSMAMXXXMXSMMMXMAXAMAXXASAXAAMXMAXAMXMMMSAMMAMX
XAAXXMASXSMMXMASAAAAMMMMSMMMMSAASXSASAAXAAMXXAXAAXSXSASXMAXMMAXXMSSMSXSASASAXMASMSXSMMAMMAMSAMXSASMMXSXSAAASMMMXSAMMMMMMSMXXMMSXMSAMASAMMAMA
MSMSASAMXMAMXMASMMSMSXMXXAXSAXMXMASAMMXSSXMASXMMSMMMXMMXAMXMSAMXAAXMMXMXMAXAMMMMAMMMMSMSXXMSXMXSXSAXMXASMMXMAMAXMMMSMAXAXXMXXXSAAAMMASXMSASX
XMXSXMXSAXAMXMASAMAMMASASMAMAXAAMXMAMMMAMAXMMMMXXXSAMSSSSSXMAMXMMMSMMASAMXMSXSAMMMAMXAXMASXMSAXXAMMSAMXMSMASMMSSMSAMSMMASMMMSASMMMXMAXMXSAMX
XMAMXMASMSXSAMXXMMXMMAMASMSMSMSASXSAMXAAXXMMAAMMMXMXSAAAXXXAXXAAAAAAXAMXMXXAASXMXMMSSMMMASAAAMMMXMXSMSXMASMXXAXSAMXXAXSXXAAMMMMAMMXSXXSAMAMM
SMSMXMAXXAAMASASASAMMSMMMMAMAAMASAMXMXMXMMMMAMXAAAAXMMSMSMMMSSSSXSSSMASXMSMMXMAMSSXAMSMMAMMMMXXAMSMSXSMSMSXXMSMMMMMSSMMMSMMSAAMSMSASXMMASXMA
SAAAAXXSMXSAAMAAAMMSAMAAAMAXMXMXMASASAXAMXAMSSSSSMSASAAAAAASMAMMMMAXXAMXMAAXXMASAAXMAAXMSMMASAMXSAASASAAXMMXSAAAMAAMXAMAXMASXSMXAMASXXXAMXXS
MXMXSXMMMMMMXMXMSMXMASXMSSMMMAXXSAMASXSAMSAMXAXMXAXMSSMMSMMSMMMMAMSMMMSSSSSXXXSXMMXXMMXMXASXSAMXSMSMAMMMMAMXSMSMSMSXSAMSSMASMMXMAMAMAAXSXMXM
SSMAXMMAAAXXAMMXAMAXAMAXAAXAASMMMASAMXMAXXAMMMMXMXMXMAMMMMMXAXAXXXAAXASAMXMMSMAMXXXSSXSASAMXSAMXXXAMAMSSSMMMMAXMXAXMMSXXAMXSXAASAMAMMMAMAMSX
SAMASASXSSSMXMASMSXSAMXMASMMMMAXSXMASXMAMSMMAAXSMMSSSMMASXMSSSMMSXMMMMXAAASAXXMAXMXMAAMMMAMAXAMAMSMXXSAXMAAAMSMSMMMXAMXXAXAMXSXSASXSMXMXAMAM
SAMASMMMXMAAAMMSAAMMAMXXXXAXASXMAMSAMMSMAAXSXSAAXASASXMMSAAAAXMASAMXAXXSMMMSSMXSXSAMMMMASMMXSSMSMAMSMMMSSSMSSXAXAMAMAMSSSMASMMAMMXMXMXMSMMAM
MMMMMMAXAMXSSSMMMMXSAMMSMXMSASAMXAMASAAMSMXXAMXMMXSAXMMXSMMMSMMMSAMASMMXAXAMXAXMASMSSXMMMAXXAXAXSMMAAAXAMAAMXMSMXXXSAMXAXSXMAMAMXAMSAMMAMMSS
XSASMSSSMSAXAAXMAAMSAAAAASXSXXMASASMMXXXAXSMXMAXXXMMMXMAMXXXXAXXMAMXAAASXMMSSSMMAMMMAASXSMMSMMMMXMSSXMMSAMXMAMAAMSMMMSMAMXMSMSMMSASMAMMASAAX
ASASAAXAXMMSSMMSMSMSSMMSSXMMASMXSASMAXXSASXMASASMMXSAMXSMMMMMMXSMMSMMMXMAAAAMASMAMAXSMMXAAAMXSAAAMAMMAAMMXMAMSMSMAAAXAMXMAAMXMXAMMXXMMSAMMSM
AMAMMMSMMXAAAAXXAMXMASMXMMAMAMAAMAMMXMXMXMXSAMSMXAMSAMAAXAAMASASAMXAXXMASMSXSAMSMMMXAXXXMMMMASXSXSASMMMSSSSMXSAMMSSMMXMASAMSAMMXSMMMMMMMSMMA
MMMMMAMXAMMSSMMSMSASAMXMASMMSSMSMXMAMSAMXMAMXXAMXXASMMSMSXMMAXASMMSAMMMAAXXAMAMXXASMSMSMMSAMXMAMXMAMXAAMMAAXAMAMXMXMAASMXMAMAXMXAMAAXAAASMMS
XASASXSXSSXAMMMSASAMAMAMAMXMXMXXMAMXXSXXXMASMSASMMMXMAMMXAMMSSMMXAXAMAMXSAMXMSAMMXSAMAAAASASMSXSAMAMMXMXMSMMXMAMXMAMSXMASMMSSMMSASMMSMMMSAAX
SXSASASMAMMMMSAMXMMSSMAMMSAMAMXMSMSMMMSMXMASAAAAXXASMXSASAXAMAASMXXMSXSXXMAMXMAXSAMXMXSMMSXMAAMMASXSXMMMXAMAMSMSAMSMMAMAAAXAMAXSAMXXMXSASMMS
SAMAMAMAAXXSAMXSAMXAAXXMAXASMMAXXMAXAAMMAMSSXMMMSAASAASAMAMSSSMMMMSMAAMMSSMASMXMMASXMXMAMSMMMMSSMMAAXMAAXMMAXAASMXMASXMSSMMSMSMMMMSAMAMXMAAS
MAMAMMMSMSXMASAXASMMSSSMXMAMXSMXSMAXXXAMXSAMMXSASMAMMMSAMXMAAAMAAAASMSMAXAMMXAMXMXMASMMAMXAMAAXXAMAMMSASXXSSSMXMMSMMMAMXAXAAXMAXSAXMMSSSXMXM
SXMASAAAMXASMMMMMMMXAXMAXMXMMAMASMMMSAMXMMXMMMMASMSXXASMMSAMXMMXMSMXSAMSSMMXXMSSXMMAXASXMSSSMSSXMMSXAMAXXAXAXXMMAAAASAMSXMSMMSAMMSSXMAAMMSSM
MAMAMMXMASXMAAAASASMSSMSMSAAAMMAMAAASMSXXSMMSAMXMAXMMXSMASXXMXSSMXAMMMXAMXAAASAMASMSMMMMAAAAAXAASAMXMXSMMXMXMMXMSSSMSAMXAXXXMXXAAMMAMMMMXAAM
SAMXXSMMAMASMMSMSASXMAAXASXMXXMSSSMMMXMXMXAMXAXSMMASMMXMASMMSAMXAMSSXMASXMMSSMASAMXXAXAMSMXMMMAXMASAMAMAXXMXXMAMAMXMXMMSMMMMMMMMMSSXMASXMSSM
MMXSAMAMASMAMXMAMAMASMMMASMXMAXAAXAXMAXASXSMSMMXXSAMAXXMAXAXMAMMXMAAMSAMAMXXAMMMMSSSMMXXAAASXSXSXXSAMASAMAXSSMXMMSAMXSAMAAXAAAAAMXMMSAMXXAAA
MAAMAMMSASXXMAXASASMMXXMXMAASAMMSMMASMSMXAMMSXAXMMMSMMSMMSSMXSSMMMXSMMASASMSMMXXXAXAAASXMSMSASASMMSASAMMSMAMAMAXXSASAMASXMXSSSSMSAMMMASMSSXM
MMSSMMASASMMMXSAMAXXSXMASMSMSAMAMASAAMAXMXMASMXMXSXAXAAAASAMXAAMXSAMAXXXAMAAMSMMMMSXMMMAXMAMAMAMMAMMMMXMAXXSSMSSXSAMXSMSASAMMAAMSASASAMXXAMA
MAAAXSXMASAXAAMXMAMMMXSASAMAMAMASMSMMSAMXSMMMMXSXMXSSSMMMSASMXXMAMASMMSMSMSMXAAAXXAXSMSMMMAMXMAMMSSSMMASMSMAMAXMAMXMXMAMAMSMMSMMSXMASASAMXAM
MMSSMSAXAMXMMSSXMASMAAXXSAMSMASXSAXMXMAMAXMMSSMMAMSXAAXAAMXXXSSMMSAMASAAAAAMXSMMSSSXSAAMMMXAXSMMMMXAASASAXMAMSMMAMASAMXMAMAXXAMXMSMXMMXXAAXS
MAMMAMXMMSXSAMXMSASMMMSMMAMXSXSXMMMSASXMMMSAAAASAMSMSMSMSMMMMAAAAMASMSMSMSMSAXAAAAMAMSAXAAMMMASXSSSSMMAMMMSASAAXSSMSXSXSXSMXXAXAXASAAMMMSSSM
MAXMSMXMAXXMMMSAMXXXXAXAXAAXAMXMXAAXMSMMSAMMSXMAMMXAAXAAAXAAXMSMMSAMXSXXAMAMASMMMMMAMAMSXSAMMAAXAAAMAMXMMXSMSXMMAAASAMAAXAXXXMMAXMMSMMAMAMAM
SMSAAAXASXXMMMAMMSSSMXSMMSMMXSAMXMXSASAAMAMAXXMASXMSMSMSMSSSSXXAMXMMMSAMSMSMMMXMAMMAMAXMAMMXMMMMMMMSSMMASASXMASMSMMMAMAMMMMSMSASMSMXXSXMXSAM
AAMXMMSAXASASMSXAAMAXXAAAXASMMAMSAMMXMMMSAMXMASASAAXAXXXAMXAMMMAXMASAMMXMAAMAMXXAASXSSSMMMSSMMXMAMXXAASAMXSXMAAMASXXAMASAAXAAAAXAAASMSASMSMS
MSMSMAMMAMMASAAMMXSAMXSMMSXMASMMAMXMMMAMXMXXSAMMXMMMMMAXASMMMAXAMXAMXXMAXSMSASMMMMMAAXAMXAAASAMSSSMSSMMASAMAMSMSASXSASXSMSXMXMMMMMSMASAMAXAX
AMAAMXMXAXMXMMMXMXMASAXAAMASMMSMAMMMASMSAMAMMMMMSSMSMASAMXAAMMSSMMMXAMXSMMXSXSAAAAMMMMMAMMXSMMMAAAMAAMSMMMSXMAXMASAMXMASAMXAASASXXXMXMMMMSXM
SMXMXSSSXSAMXXMSMMSAMASMMSAMXAAMAXXSXMMSAMASASAAXAAAAAXSXMSMSMAAXSSMXSAXAMASAMMSSSSXXAXSMSMXXSMMSMMSSXAXMAMXXXXMAMXMAXXMAMMXMSAXMMSSXXMSASAM
MAMXMMAAAMAXXAAXAAMASAMMMMXSMSSMXMAXASXSXMXSXSMSSMMMMMSMMMMMAMMSMAAMXSXXAMXXAAAMAAAMMMSMAAASAXSAXMXAXMMSMASMMSMMMSAMMSSMMMSXMMMMAXAXXSAMAMSM
XAAXAMSMMMAMSMAMMMSAMMMXAAXXXAAASMSMXXAXXMXMAMXMAMSXASXAASASASMMAMMMASASMMSSMMXMMMMXAXXMSMSMAMMMMMMMSMXXXXXXAAMXASMSAAMAMXMASAMSSSMMAAMMMMMX
SXSXSXXXAXMXXXAXAMMMSMMSMSMMMXAXMAMAMMMMXMAMAMAMMAMAXAMSMXASASMXAMXMASMSAAXXXMMXXSMSMXSMXMXXSXMMASAXAAXMXMXMSMXMXSASMXXAMAMAMAMAAAXAXMXMXAXA
XSAMXMMSMSMMMSXSXMASAMAAAAAAAMMSMXMASAAXASASXSSSMSASMMAAMSMMXMASAMXMASXSMMMMAMMSMSAAAMSASXAXMAMSASXSASMMMSAMASAAAMAMAMSSXSSSXSMMSMMSXXAMMXSM
SAMXMAAAAAXAXXAMXSMSASXMSSMMXSAAXMSASMXXAMXSXAAXAMAMXXSMXAXSXMMASAAXAMXXXMASAAAAAMSMXMMAMMSXSAMMMSXMAMAXASAMAXMSMMMMXMAMMXAMAAMXAXXXAMAXMMAM
AXMAMMSMSMSMMSSMAXXSMMAAAXAAAMMSMMMXSASAMXMMMSMMAMSSXAMXSMAMASXAXSMSSSMMSSMSXSXMSMXXSMMAMAXMMMMSAMAMXMMMMSMMMSAAMAAXXMMSSMAMMMMSXSASMSSMAMAA
MMSXSAAXAXAMAAAMASMMASMMMSMMMSAMAXSAMAMAXSXAAAXMXMMAMXSAMXMMAMMMMMMMMAASASMMMMMMMMMMSAMMMMXAAMAMASMMAMASXMXAXAXMSSSSXSAAAMXMXXAXAMAXXAAXXMAX
SAXAMASMXMXMMSAMAMAAAAXMASMAMMMSAMMASMMMMASMSSMMASMXMAMMMXSMXSAAAXAXXMMMASXMASAAAAAXMAMXAAMSMMAMXMASMSASAMMXSAMXAXXAAAMSMMSMMASMXMAMMMSMMSSM
XSMMSSMAXMMAMXXSXMSMMMMMSSXXXAXMXXSMMXAMXMXMAAASASXSMXSAXXSAASXSXSSSMXMMMMXSASMSSSSSMXMSMMAXMMSXXSMMAMASXMAMSXSMMSAMMMXMXAAASMMMAXSXAAXAMAAM
MXMAMAXMASAASXMXAAMMMSMXMMXMSMSXSXAMAXMSAXMSSSMMASAMMAAXAMMMMSAAAMMMXAAAAMMMMSAMXMAXMXMASMSMMAXSMMXMXMXMXMXMMMMAXMAMAXAXMMSAMXMSSSMMMXSAMSSM
SAMMSMMXAMMXSAAMMMAAMAAXASAAAAMAMSMMAASXMAXAAXXMXMAMMAMMXAASMMMMXMAAXMSMSMAAAMMMAMASXXMAXXMAMASAXMASASAMXXXASAMXMXSMMSMMAMXAMXMAXAXMSASAMXAX
SXSXMXMMSMMASXSXSSSSSMSSMXASMSMAMAMMMXSAMXMMSMXMASAMXSSMMSXSMAAXASMSSXAAMMSMSMXSAMXMASAXSASXMXSMMXMSMSASAMSMSASXMAXAXMXSSMSAMSMMSXMMMASMMSSM
SMMAMASMAAMASMMXMAXAAMAMMMMXMAXAMAXXMAMASXXXAXASXMMMXMAXAMMMMSXSMSAMXXMMSAXMXAAXXXXMAMMXMMMASMXMAAXMASMMAMAASAMAMAMMXMASAAMSAAXXSMMAMXMAMAMA
SAXMSAMXSMMSSXSMMMMMXMAXXAMXMMSMMMSSMMSAMMMMMMMMAAAMASMMXSASMMMSMMMSAMXAMAXAMMSXSSSMMMSAMXSAMXAXSXSXAXASMMMMMXSXMMMSAMXSAMXMSSSXMAXSSXSAMASX
XMMXMAXXMXSASXSAMXXSXMASXSMMXAAXAXXMAAMXSASAAASMSMMXMMAAXMMXAXAMXAMXMXMSSSMSXAMXXAAXAAMMSAMASMMMXMMMMSMMAASXSAMMMAASXMXMASXMAXMAXSMAAASASXSM
MSMMSSXAAXMASMSAMAMAMMASMMMSMSSSMSAMSMMXSASMSMSAMAAASXSMMMASMMMSSMSASXXMAXAXMASXMSMMMSSMMAMAMASAXAAAXSXMSMMAMXSAMMMSASAMASASXMASAAMXMMMMXMMA
XAAAAXSMMMMXMASMMAXMSMASMXAAAAAAAMXMAASAMMXAAAMAMMSMSAMAAXMSAXSAAXMAMSAMXMSMMSAXAAXXAMAXSSMMSAMXSSSSSXSAAAXSMASXSAASXMAMASAMSAAMMXXSAMXAAXSS
MSMMSXXXAXXSAMXXSASXMXSMXMSMSMMMMMASXSMXSMMSMSMMMAMXMXMSSSXSXMMMSMMMMXXXSAMXXMXMSMSMMSXMAMMXMASAXMMXMASXSSMMMXSXSMXSMSXMXMMMSMXSXMSMSXMSAMAM`;

// findXMAS(input);
findMas(input);