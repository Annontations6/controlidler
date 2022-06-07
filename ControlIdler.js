import { ExponentialCost, FreeCost, LinearCost } from "./api/Costs";
import { Localization } from "./api/Localization";
import { BigNumber } from "./api/BigNumber";
import { theory } from "./api/Theory";
import { Utils } from "./api/Utils";

var id = "controlIdler";
var name = "Control Idler";
var description = "Changelog: \nv1.0.0: \nrelease";
var authors = "Karen";
var version = 1;

var currency;
var d1, d2, d3, q1, q2, q3, q4, q5, q6;
var d1Exp, d2Exp, d3Exp, q1Exp, q2Exp, q3Exp, q4Exp, q5Exp, q6Exp;

var achievement1, achievement2;
var chapter1, chapter2;

var init = () => {
    currency = theory.createCurrency();
    currency2 = theory.createCurrency();
    currency_pack = theory.createCurrency("P", "P");

    ///////////////////
    // Regular Upgrades

    // d1
    {
        let getDesc = (level) => "d_1=" + getD1(level).toString(0);
        d1 = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(40, Math.log2(1.9))));
        d1.getDescription = (_) => Utils.getMath(getDesc(d1.level));
        d1.getInfo = (amount) => Utils.getMathTo(getDesc(c1.level), getDesc(c1.level + amount));
    }

    // d2
    {
        let getDesc = (level) => "d_2=2^{" + level + "}";
        let getInfo = (level) => "d_2=" + getD2(level).toString(0);
        d2 = theory.createUpgrade(1, currency, new ExponentialCost(20, Math.log2(30)));
        d2.getDescription = (_) => Utils.getMath(getDesc(d2.level));
        d2.getInfo = (amount) => Utils.getMathTo(getInfo(d2.level), getInfo(d2.level + amount));
    }

    // d3
    {
        let getDesc = (level) => "d_3=2^{" + level + "}";
        let getInfo = (level) => "d_3=" + getD3(level).toString(0);
        d3 = theory.createUpgrade(2, currency, new ExponentialCost(20, Math.log2(30)));
        d3.getDescription = (_) => Utils.getMath(getDesc(d3.level));
        d3.getInfo = (amount) => Utils.getMathTo(getInfo(d3.level), getInfo(d3.level + amount));
    }

    // q1
    {
        let getDesc = (level) => "q_1=3^{" + level + "}";
        let getInfo = (level) => "q_1=" + getQ1(level).toString(0);
        q1 = theory.createUpgrade(3, currency2, new ExponentialCost(1e6, Math.log2(30)));
        q1.getDescription = (_) => Utils.getMath(getDesc(q1.level));
        q1.getInfo = (amount) => Utils.getMathTo(getInfo(q1.level), getInfo(q1.level + amount));
    }

    // q2
    {
        let getDesc = (level) => "q_2=9^{" + level + "}";
        let getInfo = (level) => "q_2=" + getQ2(level).toString(0);
        q2 = theory.createUpgrade(4, currency2, new ExponentialCost(1e40, Math.log2(1e4)));
        q2.getDescription = (_) => Utils.getMath(getDesc(q2.level));
        q2.getInfo = (amount) => Utils.getMathTo(getInfo(q2.level), getInfo(q2.level + amount));
    }

    // q3
    {
        let getDesc = (level) => "q_3=16^{" + level + "}";
        let getInfo = (level) => "q_3=" + getQ3(level).toString(0);
        q3 = theory.createUpgrade(5, currency_pack, new ExponentialCost(1e40, Math.log2(1e10)));
        q3.getDescription = (_) => Utils.getMath(getDesc(q3.level));
        q3.getInfo = (amount) => Utils.getMathTo(getInfo(q3.level), getInfo(q3.level + amount));
    }

    // q4
    {
        let getDesc = (level) => "q_4=2^{" + level + "}";
        let getInfo = (level) => "q_4=" + getQ4(level).toString(0);
        q4 = theory.createUpgrade(6, currency2, new ExponentialCost(1e90, Math.log2(8)));
        q4.getDescription = (_) => Utils.getMath(getDesc(q4.level));
        q4.getInfo = (amount) => Utils.getMathTo(getInfo(q4.level), getInfo(q4.level + amount));
    }

    // q5
    {
        let getDesc = (level) => "q_5=5^{" + level + "}";
        let getInfo = (level) => "q_5=" + getQ4(level).toString(0);
        q5 = theory.createUpgrade(7, currency2, new ExponentialCost(1e140, Math.log2(800)));
        q5.getDescription = (_) => Utils.getMath(getDesc(q5.level));
        q5.getInfo = (amount) => Utils.getMathTo(getInfo(q5.level), getInfo(q5.level + amount));
    }

    // q6
    {
        let getDesc = (level) => "q_6=2^{" + level + "}";
        let getInfo = (level) => "q_6=" + getQ4(level).toString(0);
        q6 = theory.createUpgrade(8, currency2, new ExponentialCost(1e308, Math.log2(1e200)));
        q6.getDescription = (_) => Utils.getMath(getDesc(q6.level));
        q6.getInfo = (amount) => Utils.getMathTo(getInfo(q6.level), getInfo(q6.level + amount));
    }

    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency, 1e10);
    theory.createBuyAllUpgrade(1, currency, 1e13);
    theory.createAutoBuyerUpgrade(2, currency, 1e30);

    ///////////////////////
    //// Milestone Upgrades
    theory.setMilestoneCost(new LinearCost(25, 25));

    {
        d1Exp = theory.createMilestoneUpgrade(0, 3);
        d1Exp.description = Localization.getUpgradeIncCustomExpDesc("d_1", "0.05");
        d1Exp.info = Localization.getUpgradeIncCustomExpInfo("d_1", "0.05");
        d1Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

    {
        d2Exp = theory.createMilestoneUpgrade(1, 3);
        d2Exp.description = Localization.getUpgradeIncCustomExpDesc("d_2", "0.05");
        d2Exp.info = Localization.getUpgradeIncCustomExpInfo("d_2", "0.05");
        d2Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

    {
        d3Exp = theory.createMilestoneUpgrade(2, 2);
        d3Exp.description = Localization.getUpgradeIncCustomExpDesc("d_3", "1");
        d3Exp.info = Localization.getUpgradeIncCustomExpInfo("d_3", "1");
        d3Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

    {
        q1Exp = theory.createMilestoneUpgrade(3, 9);
        q1Exp.description = Localization.getUpgradeIncCustomExpDesc("q_1", "0.15");
        q1Exp.info = Localization.getUpgradeIncCustomExpInfo("q_1", "0.15");
        q1Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

    {
        q2Exp = theory.createMilestoneUpgrade(4, 1);
        q2Exp.description = Localization.getUpgradeIncCustomExpDesc("q_2", "3");
        q2Exp.info = Localization.getUpgradeIncCustomExpInfo("q_2", "3");
        q2Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

    {
        q3Exp = theory.createMilestoneUpgrade(5, 1);
        q3Exp.description = Localization.getUpgradeIncCustomExpDesc("q_3", "3");
        q3Exp.info = Localization.getUpgradeIncCustomExpInfo("q_3", "3");
        q3Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

    {
        q4Exp = theory.createMilestoneUpgrade(6, 2);
        q4Exp.description = Localization.getUpgradeIncCustomExpDesc("q_4", "0.5");
        q4Exp.info = Localization.getUpgradeIncCustomExpInfo("q_4", "0.5");
        q4Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

    {
        q5Exp = theory.createMilestoneUpgrade(7, 1);
        q5Exp.description = Localization.getUpgradeIncCustomExpDesc("q_5", "3");
        q5Exp.info = Localization.getUpgradeIncCustomExpInfo("q_5", "3");
        q5Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

    {
        q6Exp = theory.createMilestoneUpgrade(8, 18);
        q6Exp.description = Localization.getUpgradeIncCustomExpDesc("q_6", "0.25");
        q6Exp.info = Localization.getUpgradeIncCustomExpInfo("q_6", "0.25");
        q6Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }
    
    /////////////////
    //// Achievements
    achievement1 = theory.createAchievement(0, "Cacacaca", "after start to playing.", () => d1.level > 0);
    achievement2 = theory.createAchievement(1, "wi do", "buy 2 digrams one.", () => d1.level > 1);
    achievement3 = theory.createAchievement(2, "D2", "buy 1 digrams two.", () => d2.level > 0);
    achievement4 = theory.createAchievement(3, "D3", "buy 1 digrams three.", () => d3.level > 0);
    achievement5 = theory.createAchievement(4, "WTF", "did your go?", () => d3.level > 9);
    achievement6 = theory.createAchievement(5, "Game buyed digrams one", "buy 2048 digrams onw.", () => d1.level > 2047);
    achievement7 = theory.createAchievement(6, "Omega layers of layer rho", "Reach 1e24 RHO", () => currency.value > 1e24);
    achievement8 = theory.createAchievement(7, "layering", "never that point", () => currency.value > 1e25);
    achievement9 = theory.createAchievement(8, "decillion", "10^33 i good", () => currency.value > 1e33);
    achievement10 = theory.createAchievement(9, "100 d2", "buy hhhh", () => d2.level > 99);
    achievement11 = theory.createAchievement(10, "what", "i this 6.66e34 is funny good?", () => currency.value > 6.66e34);
    achievement12 = theory.createAchievement(11, "unicode has these", "whats", () => currency.value > 7.2e39);
    achievement13 = theory.createAchievement(12, "quadrupe pow await", "these good", () => currency.value > 3.0918e127);
    achievement14 = theory.createAchievement(13, "you win", "infinite support as U+221E.", () => currency.value > 1.79e308);
    achievement15 = theory.createAchievement(14, "go to impossible upg", "what", () => q6.level > 0);
    achievement16 = theory.createAchievement(15, "what milestone reached", "tell this", () => q6.level > 4);
    achievement17 = theory.createAchievement(16, "turtle", "manderot ffff", () => q6.level > 14);
    achievement18 = theory.createAchievement(17, "wonwonwonwonwonwon", "lol", () => q6.level > 999);
    achievement19 = theory.createAchievement(18, "uuuu", "lol did", () => q6.level > 66665);
    achievement20 = theory.createAchievement(19, "other max", "what", () => d1.level > 2147483646);

    ///////////////////
    //// Story chapters
    chapter1 = theory.createStoryChapter(0, "My Started!", "we add this packs in ther \ncan now this game?", () => d1.level > 0);
    chapter2 = theory.createStoryChapter(1, "Pow of this", "we sholud this going \naaaa \naaaa this get \nwhat", () => d1.level > 9);
    chapter3 = theory.createStoryChapter(2, "well", "rrrr \nhhhhh", () => d2.level > 19);
    chapter4 = theory.createStoryChapter(3, "Reach a q!", "you won \nyes yes! ", () => q1.level > 0);
    chapter5 = theory.createStoryChapter(4, "jjjj", "this jjjjj \nhhhh \nhhhh \nhhhh", () => q3.level > 49);
    chapter6 = theory.createStoryChapter(5, "you win", "whatttt \n|||||||||||| \n||||||||||||", () => q6.level > 0);

    updateAvailability();
}

var updateAvailability = () => {
    d2Exp.isAvailable = d1Exp.level > 0;
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;
    currency_pack = currency2.pow(0.08);
    currency2.value += currency.pow(0.09);
    currency.value += dt * bonus * getD1(d1.level).pow(getD1Exponent(d1Exp.level)) *
                                   getD2(d2.level).pow(getD2Exponent(d2Exp.level)) *
                                   getD3(d3.level).pow(getD3Exponent(d3Exp.level)) *
                                   getQ1(q1.level).pow(getQ1Exponent(q1Exp.level)) *
                                   getQ2(q2.level).pow(getQ2Exponent(q2Exp.level)) *
                                   getQ3(q3.level).pow(getQ3Exponent(q3Exp.level)) *
                                   getQ4(q4.level).pow(getQ4Exponent(q4Exp.level)) *
                                   getQ5(q5.level).pow(getQ5Exponent(q5Exp.level)) *
                                   getQ6(q6.level).pow(getQ6Exponent(q6Exp.level));
}

var getPrimaryEquation = () => {
    let result = "\\dot{\\rho} = d_1";

    if (d1Exp.level == 1) result += "^{1.05}";
    if (d1Exp.level == 2) result += "^{1.1}";
    if (d1Exp.level == 3) result += "^{1.15}";

    result += "d_2";

    if (d2Exp.level == 1) result += "^{1.05}";
    if (d2Exp.level == 2) result += "^{1.1}";
    if (d2Exp.level == 3) result += "^{1.15}";

    result += "d_3";

    if (d3Exp.level == 1) result += "^{2}";
    if (d3Exp.level == 2) result += "^{3}";

    result += "q_1";

    if (q1Exp.level == 1) result += "^{1.15}";
    if (q1Exp.level == 2) result += "^{1.3}";
    if (q1Exp.level == 3) result += "^{1.45}";
    if (q1Exp.level == 4) result += "^{1.6}";
    if (q1Exp.level == 5) result += "^{1.75}";
    if (q1Exp.level == 6) result += "^{1.9}";
    if (q1Exp.level == 7) result += "^{2.05}";
    if (q1Exp.level == 8) result += "^{2.2}";
    if (q1Exp.level == 9) result += "^{2.35}";

    result += "q_2";

    if (q2Exp.level == 1) result += "^{4}";

    result += "q_3";

    if (q3Exp.level == 1) result += "^{4}";

    result += "q_4";

    if (q4Exp.level == 1) result += "^{1.05}";
    if (q4Exp.level == 2) result += "^{1.1}";

    result += "q_5";

    if (q5Exp.level == 1) result += "^{4}";

    result += "q_6";

    if (q6Exp.level == 1) result += "^{1.25}";
    if (q6Exp.level == 2) result += "^{1.5}";
    if (q6Exp.level == 3) result += "^{1.75}";
    if (q6Exp.level == 4) result += "^{2}";
    if (q6Exp.level == 5) result += "^{2.25}";
    if (q6Exp.level == 6) result += "^{2.5}";
    if (q6Exp.level == 7) result += "^{2.75}";
    if (q6Exp.level == 8) result += "^{3}";
    if (q6Exp.level == 9) result += "^{3.25}";
    if (q6Exp.level == 10) result += "^{3.5}";
    if (q6Exp.level == 11) result += "^{3.75}";
    if (q6Exp.level == 12) result += "^{4}";
    if (q6Exp.level == 13) result += "^{4.25}";
    if (q6Exp.level == 14) result += "^{4.5}";
    if (q6Exp.level == 15) result += "^{4.75}";
    if (q6Exp.level == 16) result += "^{5}";
    if (q6Exp.level == 17) result += "^{5.25}";
    if (q6Exp.level == 18) result += "^{5.5}";

    return result;
}

var getSecondaryEquation = () => theory.latexSymbol + "=\\max\\rho";
var getPublicationMultiplier = (tau) => tau.pow(0.333) / BigNumber.from(25);
var getPublicationMultiplierFormula = (symbol) => "\\frac{{" + symbol + "}^{0.333}}{25}";
var getTau = () => currency.value.pow(0.8);
var get2DGraphValue = () => currency.value.sign * (BigNumber.ONE + currency.value.abs()).log10().toNumber();

var getD1 = (level) => Utils.getStepwisePowerSum(level, 2.5, 7, 0);
var getD2 = (level) => BigNumber.TWO.pow(level);
var getD3 = (level) => BigNumber.TWO.pow(level);
var getQ1 = (level) => BigNumber.THREE.pow(level);
var getQ2 = (level) => BigNumber.from(9).pow(level);
var getQ3 = (level) => BigNumber.from(16).pow(level);
var getQ4 = (level) => BigNumber.TWO.pow(level);
var getQ5 = (level) => BigNumber.FIVE.pow(level);
var getQ6 = (level) => BigNumber.TWO.pow(level);
var getD1Exponent = (level) => BigNumber.from(1 + 0.05 * level);
var getD2Exponent = (level) => BigNumber.from(1 + 0.05 * level);
var getD3Exponent = (level) => BigNumber.from(1 + 1 * level);
var getQ1Exponent = (level) => BigNumber.from(1 + 0.15 * level);
var getQ2Exponent = (level) => BigNumber.from(1 + 3 * level);
var getQ3Exponent = (level) => BigNumber.from(1 + 3 * level);
var getQ4Exponent = (level) => BigNumber.from(1 + 0.5 * level);
var getQ5Exponent = (level) => BigNumber.from(1 + 3 * level);
var getQ6Exponent = (level) => BigNumber.from(1 + 0.25 * level);

init();