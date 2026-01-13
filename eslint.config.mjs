import config from "@adddog/eslint";

export default config().overrideRules({
    "no-barrel-files/no-barrel-files": "off",
    "regexp/no-unused-capturing-group": "off",
    "rad/no-as-unknown-as": "off",
});
