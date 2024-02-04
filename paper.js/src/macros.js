const AWAITING_SHOT = 0;
const BALLS_MOVING = 1;
const BALLS_ENTERING_POCKET = 2; // means no ball is moving and only are entering pocket
const ANALYZING_EVENTS = 3;

const MAX_MOVEMENT_PER_FRAME = 9;
const MIN_MOVEMENT_PER_FRAME = 3;

let GLOBAL_TIME_MULTIPLIER = 0.8;
let DEFAULT_GLOBAL_TIME_MULTIPLIER = 0.8;
let PREF_GLOBAL_TIME_MULTIPLIER = 0.8;
let MAX_GTM = 20;
let DYNAMIC_GTM = false;

const SOLID = 0;
const STRIPES = 1;

const CUE_COLLIDE_NO_BALL = 0;
const POCKET_8 = 1;
const CUE_COLLIDE_NO_TARGET_BALL_FIRST = 2;
const NO_BALL_COLLIDE_RAIL_OR_POCKET = 3;
const POCKET_CUE = 4;
const POCKET_NO_BALL_AND_LESS_THAN_4_COLLIDE_RAIL = 5;

const stateStrings =['Awaiting Shot', 'Balls Moving', 'Balls Entering Pocket', 'Analyzing Events'];

const foulsMessages = [
    "Cue Hit No Ball.", "Illegally Pocket 8 Ball.", "Cue Hit Non-Target Ball First.",
    "No Ball Has Hit Rail Or Pocketed.", "Pocket Cue.", "Illegal Break."
];
const ballsColorMeta = [
    'white', 'yellow', 'blue', 'red', 'purple', 'orange', 'green', 'maroon', 'black',
    'yellow', 'blue', 'red', 'purple', 'orange', 'green', 'maroon'
];