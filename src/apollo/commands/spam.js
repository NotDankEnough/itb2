// Copyright (C) 2022 ilotterytea
// 
// This file is part of iLotteryteaLive.
// 
// iLotteryteaLive is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// iLotteryteaLive is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with iLotteryteaLive.  If not, see <http://www.gnu.org/licenses/>.
module.exports = {
    cooldownMs: 60000,
    permissions: ["su", "br", "dank"],
    execute: async (args) => {
        if (!inCooldown.includes(args.user.username)) {
            inCooldown.push(args.user.username);
            setTimeout(() => inCooldown = inCooldown.filter(u => u !== args.user.username), this.cooldownMs);

            var range = parseInt(args.msg_args[1]);

            if (isNaN(range)) return await args.lang.TranslationKey("cmd.spam.execute.integer_failure", args, null);

            // Range limit:
            if (range > 32) return await args.lang.TranslationKey("cmd.spam.execute.integer_failure", args, null);

            // Doesn't continue the code execution if channel is live:
            if (await args.gql.isStreamLive(args.channel)) return null;

            var msg = args.msg_args.slice(2, args.msg_args.length).join(" ");
            var regex = /(!|@|#|\$|%|\^|&|\*|\(|\)|-|=|\+|\\|\/|:|"|'|\[|\]|\||<|>|\?|\.)/;

            // This check should prevent the bot from executing commands:
            if (regex.test(msg) && (args.role != "su")) {
                return await args.lang.TranslationKey("cmd.spam.execute.sus", args, null);
            }

            for (let i = 0; i < range; i++) {
                args.apollo.client.say(args.target, msg);
            }

            return null;
        }
    }
}

let inCooldown = [];