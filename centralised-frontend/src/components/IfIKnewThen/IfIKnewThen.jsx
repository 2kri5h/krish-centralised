import React, { useState, useEffect, useRef } from "react";
import "./IfIKnewThen.css";
import {
  FaChevronDown,
  FaChevronUp,
  FaQuoteLeft,
  FaQuoteRight,
} from "react-icons/fa";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

const adviceData = [
  {
    chapter: "Careers",
    advice: [
      {
        text: "If you see yourself as an entrepreneur, start your company as soon as you possibly can. If you know the field you want to work in but aren't sure about your business plan, go to work for a company that you admire in the same type of business you want to create. If you go this route, do not be concerned about compensation. Get all the knowledge you need to launch your own firm.",
        author: "Vivaan Vasa",
        batch: "2019",
      },
      {
        text: "Choose work you enjoy and that serves as many people as possible. Focus on serving others — not on building wealth. Serve well, and money will follow.",
        author: "Jayan Kothari",
        batch: "1983",
      },
      {
        text: "Have the discipline to limit work hours.",
        author: "Shalv Goel",
        batch: "1973",
      },
      {
        text: "Decide you like what you do, and do it better and smarter than anyone else. If you can't, change your career. Don't create an expensive lifestyle — living modestly frees you to make appropriate choices.",
        author: "Tanya Sehgal",
        batch: "1983",
      },
      {
        text: "Work and pleasure are not synonymous, but they're not opposites, either. Loving what you're doing (well) can be infectious and motivating to others. Ultimately, that's leadership.",
        author: "Kaira Sem",
        batch: "1973",
      },
      {
        text: "Work is not always fulfilling. That is why we call it work. But if, at the end of a year or five years, you can identify concrete examples of changes you have made that have improved your company or the careers of your employees, I think that is fulfilling.",
        author: "Nitya Sarin",
        batch: "2004",
      },
      {
        text: "Work hard. Be honest. Help others.",
        author: "Divyansh Kapadia",
        batch: "2014",
      },
      {
        text: "Put up with boring, soul-destroying work only when you're young, exploring your options, and establishing your credibility. Once you become established, become discriminating about your work, colleagues, clients, and associates.",
        author: "Aniruddh Dad",
        batch: "2004",
      },
      {
        text: "Think twice before joining a family firm — but it is not always a wrong choice.",
        author: "Indranil Malhotra",
        batch: "1983",
      },
      {
        text: "Be very good at what you do and be good to the people you work with. Honor and respect those who work for you and make your achievements possible.",
        author: "Tejas Sem",
        batch: "1983",
      },
      {
        text: "Keep re-inventing yourself through self-education, because industries change quickly.",
        author: "Rahul Sharma",
        batch: "1973",
      },
      {
        text: "Be willing to take risks when a learning experience is worth it. Don't be afraid to test your skills in an assignment that may be unfamiliar or unpleasant. No matter what adversity may arise, remain focused on achieving your goal of performing to the best of your ability. The rewards will naturally follow.",
        author: "Arjun Mehta",
        batch: "1983",
      },
      {
        text: "Make sure you truly know who you are, your strong points and weaknesses. A solid self-assessment is an important step in the right direction. Many of us do not do this to the full extent.",
        author: "Priya Patel",
        batch: "1999",
      },
      {
        text: "While still a teenager, make a list of all the things you like doing, and those you don't like. Then find a job or study that maximizes the activities you like and minimizes the others. A happy and fulfilling job should feel like indulging in a hobby. Success is a result of true enjoyment and effort.",
        author: "Vikram Singh",
        batch: "2004",
      },
      {
        text: "As my good friend and author, Richard Leider, says, 'Heed your life's calling — that inner urge to give your gifts away.' This requires being clear about your gifts, values, and passions, and using them as a compass to find your career path. It is an 'inside-out' process.",
        author: "Ananya Reddy",
        batch: "2014",
      },
      {
        text: "No surprise: Succeeding in business is the polar opposite of winning the lottery (pure luck, no effort). Blood, sweat, tears early on and consistently throughout. Become very knowledgeable about your product, service, or industry, and cultivate lasting relationships with people. Be completely honest in all dealings — even if it's painful.",
        author: "Kavita Desai",
        batch: "1973",
      },
      {
        text: "Look for mentors who are in a place you would like to be, doing what you would like to do. Seek their counsel.",
        author: "Anonymous",
        batch: "1983",
      },
      {
        text: "Find an industry that gets you excited and a company that places excellence and integrity at the top of their list of core values. Identify the areas in which you can truly excel. What you do well is not work — no matter how hard it is and how many hours are required. Learn everything you can about your company, its industry, and your job. Understand both the details and the big picture. Always be willing to help others, because many will later help you. Befriend and work with the best people, because they will make you better.",
        author: "Rohan Kapoor",
        batch: "1999",
      },
      {
        text: "Try to find your passion — what you love thinking about and doing. If you can find a career doing something you are already passionate about, the finances will flow, along with a better balance in life.",
        author: "Neha Gupta",
        batch: "2004",
      },
      {
        text: "Pursue your own interests, and not the wishes or desires of someone else. Find a mentor to provide advice and guidance along your career path. Be prepared to relocate geographically to gain a more complete knowledge of your company, and to experience other lifestyles and cultures.",
        author: "Aditya Malhotra",
        batch: "2014",
      },
      {
        text: "Think through your strengths and weaknesses. Work hard with your strengths and work with other people to balance your weaknesses. Avoid the temptation to charge off in many different directions. Stay focused, do the best job you can, and keep your eyes open for new opportunities.",
        author: "Meera Sharma",
        batch: "1973",
      },
      {
        text: "Look for work in areas where you have built-in confidence based on your own experience or preferences. It's not to say you can't succeed in areas in which you never thought you had talent, but your shortest path will come through your strengths. If you like your work, your chances of success will be higher. In the workplace, make your first priority improving your organization, department, or work unit rather than worrying about how the company will help further your own ambitions. Take pride in making everyone better wherever you are. Success takes care of those who create success for others.",
        author: "Rajiv Verma",
        batch: "1983",
      },
      {
        text: "Stay away from the 'family business' and follow your own instincts. If you don't truly enjoy what you are doing, seek change.",
        author: "Sneha Patel",
        batch: "1999",
      },
      {
        text: "Choose a field that you can readily and fully understand. Choose a career path along which the work will be enjoyable — even exciting. Failing to do so will throttle your enthusiasm, commitment, and effort.",
        author: "Amit Singh",
        batch: "2004",
      },
      {
        text: "Take chances. At 24, I moved to Chicago, where I had never been, and joined a company I previously was unaware of. It turned out to be a terrific move.",
        author: "Kavita Desai",
        batch: "2014",
      },
      {
        text: "For me a fulfilling career consists of sharing the ownership with all employees. I also believe in a very transparent information system so that employees at all levels can judge our successes and failures for themselves.",
        author: "Sanjay Verma",
        batch: "1973",
      },
      {
        text: "Look for something you are good at, where accomplishment will be rewarded, which pays well (at least at the higher levels) and gives you the opportunity to work with smart people who will stimulate you and challenge you to grow.",
        author: "Meera Kapoor",
        batch: "1983",
      },
      {
        text: "I cannot do better than repeat Joseph Campbell's admonition: 'Follow your bliss.' Seek work that you love and do it.",
        author: "Vikram Singh",
        batch: "1999",
      },
      {
        text: "Selecting your first job after an MBA graduation is extremely important. Take the time to determine if that first job will provide lots of opportunity to take advantage of your strengths and interests, and will provide the upside that you are looking for. (A Harvard MBA is a precious commodity, and one should take full advantage of it.)",
        author: "Anjali Gupta",
        batch: "2004",
      },
      {
        text: "To greatly enhance the odds of enjoying a career which is both fulfilling and successful, one must find an endeavor, a subject, métier, process, environment for which one has a passion. This could be aviation, geology, medical science, investing, writing fiction, etc. In my case, it was a love of markets and investing that my father inculcated in me very early on. This passion has led me to often declare, 'I have never worked a day in my life.'",
        author: "Riya Malhotra",
        batch: "2014",
      },
      {
        text: "I would have been more focused on finding a career that I truly enjoyed, rather than one that I thought would make me the most money. I would have been more willing to take risks and to follow my passion, even if it meant making less money initially.",
        author: "Rahul Sharma",
        batch: "1973",
      },
    ],
  },
  {
    chapter: "Marriage & Family",
    advice: [
      {
        text: "Make family life your first priority. Marry someone you admire and are always learning from, who admires and learns from you. Help each other grow and share values, plans, experience, laughs, and time together.",
        author: "Pari Zacharia",
        batch: "1999",
      },
      {
        text: "Your children are your legacy. Give them unconditional love within a framework that teaches them your values but also allows them to be who they are. Spend as much time with them as possible. Time spent when they are young is like money in a piggy bank: don't expect them to spend time with you when you are old if you did not invest in them when they were young.",
        author: "Dhruv Venkatesh",
        batch: "1999",
      },
      {
        text: "As for family matters, I can be very brief and to the point: Happy wife, happy life.",
        author: "Ayesha D'Alia",
        batch: "2014",
      },
      {
        text: "Marriage is an 80-20 partnership, on both sides. If you each understand that, you always go out of your way to please your spouse. When both partners do that, you have a happy marriage. The greatest gift you can give your children is to love one another.",
        author: "Hunar Golla",
        batch: "2004",
      },
      {
        text: "The two most important decisions one makes in life are where you go to school and whom you choose to marry. All else follows from these choices. While there are several obvious traits to be sought in a spouse — mutual love, attractiveness, and intelligence — one overlooked but important quality is kindness. Marriage brings both shared happiness and challenges. Kindness allows both parties to understand and empathize with each other as they mutually solve the issues that enter their lives. Another important element is religion. The couple-to-be should discuss in advance of marriage what religion they will observe and what religious practices they will maintain when they marry, and especially when they have children.",
        author: "Aarav Dani",
        batch: "2014",
      },
      {
        text: "Children pay most attention to what you say with your feet, rather than your mouth.",
        author: "Zaina Kala",
        batch: "1973",
      },
      {
        text: "When raising children, make sure they grow up to be independent. Too many of us want to make life easy on our kids and save them from anguish. That is not always the best course of action.",
        author: "Shamik Saraf",
        batch: "1973",
      },
      {
        text: "Have fun. Doing things well is fun. Have a good relationship with each child, set boundaries, ensure each knows being loved. When in doubt, use the three most important words with your spouse: 'You're right, dear.'",
        author: "Yakshit Wable",
        batch: "2014",
      },
      {
        text: "The sweetest words in the English language are, 'Granddad, would you like to …?'",
        author: "Azad Ahuja",
        batch: "1973",
      },
      {
        text: "Even though I am satisfied with — and worked hard for — my professional career, family demands on my time always had priority. This may have restricted my business success, but I have no regrets. I have seen many people proudly create products, organizations, buildings, and fortunes. Most of these works have not outlasted the people who created them. I am fairly confident my family will continue as a healthy and confident structure for much longer.",
        author: "Alisha Sunder",
        batch: "1973",
      },
      {
        text: "Exercise patience. It took me two marriages and 80% of a lifetime to appreciate the value of that word.",
        author: "Anonymous",
        batch: "1963",
      },
      {
        text: "Tell your spouse and children that you love them every day, no matter how you feel. Do not bring your problems home with you. Realize the joy that comes from helping your spouse and children excel in their fields of interest and enjoy themselves. Develop within your family a sense of obligation to help others. Spending quality time with your family — not just time — is critical. Choose a spouse who will understand and support you, and one for whom you will do the same. Life is much better if you can help each other grow and expand your knowledge, experiences, friends, and capabilities.",
        author: "Ryan Kumar",
        batch: "1973",
      },
      {
        text: "Recognize that choosing your life's partner is one of the two most important decisions you will ever make. Give your choice the attention it deserves. Think through what's truly important to you. Choose someone you will enjoy working with to achieve your common goals. Of course, being in love is very important — but it is not enough. Once you are married, it's important to continue to work together. Recognize that the other person has his or her own goals and ways of doing things. Make it clear what is important to you, make sure you understand what is important to her, and then reach decisions that incorporate both sets of goals.",
        author: "Nehmat Kala",
        batch: "1999",
      },
      {
        text: "I believe the most significant barrier to a healthy, happy family is the combination of self-will, a sense of authority rather than partnership and respect, and a reluctance to express forgiveness. The qualities of respectful communication, trust, patience, and an abundance of flexibility will lead to a family life of happiness and mutual love, even through the tough times.",
        author: "Vaibhav Dash",
        batch: "2004",
      },
      {
        text: "Staying married (49 years): Be tolerant; don't try to change him or her; do something each day to make your spouse happy. Raising children: Try to build character — honesty, morality, and kindness. Set the example for them to follow.",
        author: "Hunar Walia",
        batch: "1983",
      },
      {
        text: "Take your time finding the right marriage partner. Find your own identity before imposing yourself on someone else. Understand that commitment to your work ambitions has to be balanced with commitment to your family, even if achievements in business may at times suffer. In the long run, you can reach your goals without sacrificing your family life. Teach your children both through mentoring and by example. Build their self-esteem, but teach them how to succeed with humility. Demonstrate team play at home so the family learns the art of working together. Be firm and consistent, but also understanding and flexible. Don't expect your children to be you or to satisfy your dreams. Let them be themselves.",
        author: "Mohanlal Dua",
        batch: "1983",
      },
      {
        text: "Do not try to determine your children's future for them. Support them in their choices. We did, and have been blessed with two college professors and a dean.",
        author: "Akarsh Acharya",
        batch: "2014",
      },
      {
        text: "I envy my friends who have not had to experience divorce. Though many get it right the first time, research shows the odds are not good if you get married before age 30. I believe most of us change a great deal in our 20s, and know ourselves and others better later. I am blessed with great children and, early on, listened to a wise man in my company who told me: 'Spend as much time as you possibly can with your kids now, because you can't come back and do it later.'",
        author: "Prerak Bail",
        batch: "1973",
      },
      {
        text: "Marry when you and your prospective spouse know who you are and what work you will do. Make sure you each are willing to support the other in having the life you each want.",
        author: "Kavya Madan",
        batch: "2004",
      },
      {
        text: "As for marriage, give space and insist on your own. Before the ceremony, look for brains, even temper (that I lack), a can-do attitude, and accomplishments. Check out the prospective in-laws carefully. And at the end, seek true beauty (philosophy and appearance). Forget infatuation.",
        author: "Damini Dar",
        batch: "2004",
      },
      {
        text: "Most of us would do well to delay getting married until we are established on a career path. Then we should delay having children until we are sure we're prepared for the challenges of raising a family. While we're meeting our responsibilities as parents, we must remember to maintain a strong, loving relationship with our spouse.",
        author: "Yuvraj Chauhan",
        batch: "2014",
      },
      {
        text: "Respect the interests and desires of each family member. Establish traditions and special geographic places for your family — this becomes more important as families typically move around a lot. Remember that you can't make up later for missing key times in your family's life.",
        author: "Nehmat Deshpande",
        batch: "1983",
      },
      {
        text: "No one is born a parent. Although our media and bookshops are filled with endless self-help guides and courses, parenting is one of those things in life you must learn by doing. Striving to be a good husband and father have been my greatest challenges. I do not regret one bit that we set many 'reach goals' for our children — both academically and in sports. In my view, it is necessary to stretch for something that is well beyond your grasp. If you never push yourself to your limits, how do you even know what your limits are? And if you do not force yourself beyond those limits, how do you grow?",
        author: "Anahita Tara",
        batch: "2014",
      },
      {
        text: "Put the children first. A loose reign — but not too loose — works with children (and horses). Love them totally and unconditionally. Make a few sacrifices for the common good. Remember that different generations don't like the same music.",
        author: "Anonymous",
        batch: "1963",
      },
      {
        text: "All our children are successful and happy and live near our home. We have family parties each month for ourselves, children, and grandchildren. We really enjoy being together. Families who play together stay together.",
        author: "Anonymous",
        batch: "1963",
      },
      {
        text: "Teach your children by example. Rejoice in their differences. Remember that you are their parent, not their friend.",
        author: "Anonymous",
        batch: "1963",
      },
      {
        text: "Family First — it's the center of my life, and directs and governs everything in it. Growth comes when this center is working; setback creeps in when I lose the Family First focus. When my troubles invade, I look at myself in the mirror and laugh. This key to life is so simple, but we seem at times to make it so difficult and complicated. Drive from Family First and life will be better, longer.",
        author: "Oorja Srinivas",
        batch: "1973",
      },
      {
        text: "Everyone knows that we allocate time to whatever we value most. Don't kid yourself into accepting the 'quality time is good enough' myth. The gift of actual time — and a lot of it — is essential to nurturing healthy family relationships.",
        author: "Shlok Bahl",
        batch: "2014",
      },
      {
        text: "Find someone who has both some mutual interests and some differing interests. Respect each other, no matter how much you may disagree. Do things together.",
        author: "Keya Dhar",
        batch: "1983",
      },
      {
        text: "Staying married is a real trick, and worth the care it takes to accomplish this. Each of us is formed by our backgrounds, and blending our views and concerns takes listening and understanding. But oh, is it worth it to live happily with the person of your choice!",
        author: "Ivana Rout",
        batch: "1983",
      },
      {
        text: "This is not easy. It takes commitment, time set aside for family fun and relationships, and an ability to rise from the ashes when things don't work out the first time around.",
        author: "Mohanlal Chawla",
        batch: "1973",
      },
      {
        text: "Encourage family togetherness, frequent communications, joyous occasions. If things get tough in a marriage, don't give up the first (or second) time there is a problem. Too many marriages are terminated after hitting the first rough spot.",
        author: "Samar Balasubramanian",
        batch: "1999",
      },
      {
        text: "Finding that special person whose values, goals, interests, and tenacity match yours, then getting and staying married, is the greatest pleasure and satisfaction anyone can possibly have. It isn't always easy, but the companionship and partnership produce continuing teamwork, rewards, and pleasure. Raising children becomes a never-ending source of pride, requiring work, time, patience, and expense. As children mature and themselves become spouses and parents, they provide an ever-changing perspective on wisdom and happiness.",
        author: "Zeeshan Suresh",
        batch: "1983",
      },
      {
        text: "Before the wedding, make a deal about what type of life you expect to lead. Be willing to argue about things openly and even often. Hang out with your kids a lot, even if it means missing work opportunities. Give your kids the best schooling you can. Exercise together.",
        author: "Zain Bhatt",
        batch: "2014",
      },
      {
        text: "Be committed to the family, even at the expense of work. Stay sunny. Keep a sense of humor.",
        author: "TAkarsh Goyal",
        batch: "2014",
      },
      {
        text: "I would say that marriage and parenthood are the essential human experience. While career was important, family life was, in the end, the most satisfying part of my life. I think a happy marriage and family are one of the most important predictors of success in business.",
        author: "Zain Chandra",
        batch: "2004",
      },
      {
        text: "Don't forget: while you're still busy elsewhere, marriage and family will inevitably be the most important elements of determining success or happiness for most people.",
        author: "Krish Chandra",
        batch: "2014",
      },
      {
        text: "I can't say I have been good at it, but being willing to listen to each other and compromise are keys to staying married.",
        author: "Indrajit Chaudhuri",
        batch: "2014",
      },
      {
        text: "I am convinced there is a lot of luck involved in these 'family matters.' Having said that, the one thing that surely makes one more 'lucky' is to give family matters as much time, effort, and attention as possible.",
        author: "Navya Kaur",
        batch: "2014",
      },
    ],
  },
  {
    chapter: "Business",
    advice: [
      {
        text: "Pay people well. Provide profit-sharing. If you care about them, they will care about you.",
        author: "Bhavin Karnik",
        batch: "2014",
      },
      {
        text: "With the advent of our society's love affair with technology, especially in the younger generations, my wish is that those generations understand that communication screen-to-screen is not the same — by a factor of 1,000 — as communication face-to-face. That goes for the classroom, the living room, and the bedroom.",
        author: "Anonymous",
        batch: "1963",
      },
      {
        text: "Success in business relies a lot on making sure your colleagues or employees share a good part of any success you may have. The mistake is to believe that you are more important than anyone else in the business.",
        author: "Anonymous",
        batch: "1963",
      },
      {
        text: "Surround yourself with the smartest, most ethical people you can find. Set clear goals, communicate them clearly, and delegate.",
        author: "Dhruv Kapadia",
        batch: "1999",
      },
      {
        text: "Knowing that all people are complex in values, motivations, and objectives, and that groups of people are complexes of complexities, all of which are hidden from view, you will be surprised by wrong behaviors — including your own. So maintain active reconnaissance and objectivity to catch misbehavior early. Flood the system with positive ethics to prevent or discourage bad or mediocre behavior. Nobody who has lived by self-demanding high standards has ever said, 'I wish I hadn't.'",
        author: "Dharmajan Reddy",
        batch: "1999",
      },
      {
        text: "It's a mistake to credit success in business too much to one's own skill. My experience is that good timing and luck contribute as much or more to success as does skill. The same is often true of failure. My advice is to stay humble, patient, and persistent. Over time, timing and luck tend to even out. Debt sucks.",
        author: "Kismat Hayre",
        batch: "2014",
      },
      {
        text: "Mistakes: Greed, Dishonesty, Self-delusion, Lack of an ethical compass",
        author: "Anahi Chaudhry",
        batch: "1983",
      },
      {
        text: "Mistakes: Acting too slowly, Waiting until all is understood, No (or low) risk. Act fast. Take risks.",
        author: "Anaya Mannan",
        batch: "2004",
      },
      {
        text: "One mistake is to stick with a highly profitable business model too long when the world is changing. Another is to abandon the old for the next new thing, particularly if the path to profitability is not clear.",
        author: "Saksham Jhaveri",
        batch: "2004",
      },
      {
        text: "Hire the best people. Mistakes: Fear of hiring people who are smarter than you are, Borrowing too much money, Growing a business too quickly, Failing to let people grow by not delegating enough responsibility, Not emphasizing the importance of reputation and good ethics",
        author: "Pranay Bedi",
        batch: "2004",
      },
      {
        text: "Pursuing random opportunities diffuses one's efforts. Exceeding one's resources gets you into trouble when times weaken. If you're always overspending and trying to do too much, you can be successful 10 times in a row and be wiped out on the 11th time. As time goes by, it's become clear that people skills are very important. Ultimately, a business and a career will be successful if you understand how to motivate and work with other people.",
        author: "Hrishita Hans",
        batch: "1983",
      },
      {
        text: "'The harder I work, the luckier I get' was and is my philosophy in business.",
        author: "Anonymous",
        batch: "1963",
      },
      {
        text: "I too easily accepted advice of professionals (lawyers, accountants, etc.) when their advice led to an easier or more financially advantageous path, when this ran contrary to my instincts.",
        author: "Kismat Rajan",
        batch: "2004",
      },
      {
        text: "Aspire for the heights but prepare for the depths. Always do due diligence. Respect your colleagues.",
        author: "Lavanya Bhakta",
        batch: "2014",
      },
      {
        text: "Creating success in business has to be 'a shared learning experience.' I believe that all employees need information — not only about the total company but also their particular division or department. Transparency is the key to a successful entrepreneurial company.",
        author: "Rati Sani",
        batch: "1983",
      },
      {
        text: "The hubris that comes from success leads one to believe one's next venture will also succeed, given the same hard work and leadership skills. This is not the case. The circumstances are different, the business is different. Never assume one success automatically leads to another. When starting a new business, be sure you understand the quality characteristics required by the market. Otherwise, you'll efficiently produce millions of a product that somehow fails the customer taste test.",
        author: "Anonymous",
        batch: "1963",
      },
      {
        text: "When you are trying to create success, make sure the business has the potential to succeed. Is there a market for your product? Are the people willing to work very hard to succeed? Do you really have a fair, clear shot at success? If the game is 'no longer worth the candle,' get out pronto. Hanging around and taking a thousand arrows because you believe in an endeavor is done too much. I did it myself.",
        author: "Onkar Sandal",
        batch: "1983",
      },
      {
        text: "One of the best things that can happen is to get fired. It forces change and if managed correctly, can result in improvement. I never would have started a family business unless I'd been fired from Wall Street.",
        author: "Anonymous",
        batch: "1963",
      },
      {
        text: "Not all decisions turn out well. Be prepared to deal with problems over which you have no control. Almost everything will require more money and more time than you think. Never settle for 'good enough.' Always strive for excellence. Set high expectations for yourself and those with whom you work. Move quickly to deal with people issues. Hiring smart, driven people is a ticket to your own success.",
        author: "Umang Rattan",
        batch: "2014",
      },
      {
        text: "It's a mistake to stick too long — for whatever seem good or necessary reasons — in trying to make an effort successful when there are clear signs it isn't really viable.",
        author: "Nitara Ghose",
        batch: "2014",
      },
      {
        text: "I sometimes fell prey to the management fads of the time, and tried to push the future too fast.",
        author: "Anvi Sani",
        batch: "2014",
      },
      {
        text: "Keep your costs and financial commitments low and short-term. Don't underestimate your capital needs over time.",
        author: "Tara Chandra",
        batch: "2014",
      },
      {
        text: "One of the biggest mistakes is to think you know it all — or even have to know it all. Learning to surround yourself with people who know more than you do and learning to accept their advice is a big step — especially for people with Harvard Business School-graduate egos. To succeed in business, show people that you appreciate their contributions with public and private praise and financial reward. If your company does well financially, be sure to share that with your key people.",
        author: "Yasmin Bose",
        batch: "2004",
      },
      {
        text: "The biggest mistake I've seen in my own experience is diversifying away from one's core business and strengths.",
        author: "Dhanush Kala",
        batch: "1983",
      },
      {
        text: "Treat employees well. Beware of sympathetic business decisions. They always need to be fundamentally sound.",
        author: "Yakshit Babu",
        batch: "1973",
      },
      {
        text: "I made some mistakes in running one of my small business endeavors. Had it been my first business, it might have been excusable. But it was not. In fact, it was my last. From it, I learned how important it is to think clearly about the fundamental purpose of the enterprise. Among the most important ingredients is the need to establish a principle of being fair to all the stakeholders.",
        author: "Ishita Guha",
        batch: "1983",
      },
      {
        text: "I think a good businessperson must understand capitalism and the philosophy that underpins it. I think a faith is all that is needed to chart the ethics, the respect for others, the proper position of doing good, and the self-discipline to perform at a high level.",
        author: "Oorja Khatri",
        batch: "1999",
      },
      {
        text: "I have made many mistakes. I don't dwell on them. 'Fess up to them reluctantly and move on quickly. It is the cover-up that always is fatal.",
        author: "Umang Khurana",
        batch: "1973",
      },
      {
        text: "The first requirement is to work in a field where continuing success is possible. If there are no barriers to entry, a profitable business will be overwhelmed with new competitors as soon as it begins to make money.",
        author: "Nehmat Bal",
        batch: "1983",
      },
      {
        text: "Stay tuned to local sensitivities. Very few are fit for a career anywhere in the world.",
        author: "Anonymous",
        batch: "1963",
      },
    ],
  },
  {
    chapter: "Wealth",
    advice: [
      {
        text: "Money ... cannot buy happiness or respect. I know many people who are living happy, satisfied lives on very little money. On the other hand, I have been poor and I have been rich, and it is a lot easier to be rich.",
        author: "Jiya Chatterjee",
        batch: "1999",
      },
      {
        text: "Money to me is freedom. That is all I want of it. I don't view it as a yardstick and do not measure myself or others by it. My greatest admiration is for non-financial accomplishment.",
        author: "Vritika Sule",
        batch: "1973",
      },
      {
        text: "Spend moderately, invest substantially, and be moderate in 'helping' your kids. Do not give them a lot. You'll mean well, but will be doing them harm.",
        author: "Nishith Bhatt",
        batch: "2004",
      },
      {
        text: "When we graduated from the Harvard Business School, the priorities were Money, Power and Position. I had misgivings about this, and remember writing on the blackboard these words by William Wordsworth: 'Getting and spending, we lay waste our powers.' I think the most important idea of success is the contribution you make to others, and this cannot be quantified. What you give is much more important than what you get. Following your values will lead to a much 'richer' life.",
        author: "Samarth Khurana",
        batch: "1973",
      },
      {
        text: "You need to accumulate enough wealth to provide a good life for your family, educate your children, support worthwhile causes, amply provide for your retirement years, and leave something for your heirs. But that's not the litmus test for success. The real test is how well you are respected by your family, colleagues, employees, and friends. That respect is earned by your actions over long periods of time — not your balance sheet.",
        author: "Shray Jhaveri",
        batch: "1973",
      },
      {
        text: "Financial wealth is a good measure of business success. But life is more than your career. To be truly successful, you need to build a good marriage, a good career, a good family, maintain good health, and have a sense of purpose to your life beyond both career and family.",
        author: "Shray Shere",
        batch: "1999",
      },
      {
        text: "On inheriting: We have decided that a little inheritance is fine — a lot is a burden. Our kids all had a great education and the opportunity to go as far as they wanted to go, fully paid for, no debts. We consider that to be the greatest gift parents can give to their offspring.",
        author: "Lakshit Sethi",
        batch: "1973",
      },
      {
        text: "Is financial wealth a yardstick of success? Absolutely not! Mother Teresa, Albert Schweitzer, Gandhi, Churchill — not much money there. Money is no longer the sine qua non it once was. I now appreciate that it can be used to make a better life on this planet for many who inhabit it. But I still like money. I still like counting it.",
        author: "Anonymous",
        batch: "1963",
      },
      {
        text: "I was born in 1932 and grew up during the Depression. In the beginning, poverty was the level to which I aspired. When I reached it, my next goal was to get out of debt. That took several years. Then my goal was to become financially independent. After reaching independence, more money was not a great motivator for me. My interest became trying to make a difference — making the company I worked for successful, and working for my church and other volunteer organizations.",
        author: "Arjun Mehta",
        batch: "1973",
      },
      {
        text: "I do not agree, although I did until I had worked many years. Find work that you love, as long as you can earn enough to provide for your family and a reasonably comfortable retirement. Those who persist in believing wealth brings happiness are to be pitied.",
        author: "Priya Sharma",
        batch: "1983",
      },
      {
        text: "Happiness should be the yardstick of success.",
        author: "Rahul Verma",
        batch: "1999",
      },
      {
        text: "Wealth is absolutely an important yardstick, but not the only one. The really successful people are those who love their work, make money from it, and manage to keep close friends.",
        author: "Ananya Patel",
        batch: "2004",
      },
      {
        text: "Money is not a sustainable driver of happiness or success — period. Family is.",
        author: "Anonymous",
        batch: "2014",
      },
      {
        text: "I do largely agree that financial wealth is a yardstick of success. However, I would add that in judging the degree of someone's financial success, it is extremely important to know where one started. At the Harvard Business School, many if not most graduates started from a high base. Moreover, it is important to know how one handled his or her financial success and how much he or she gave back to society.",
        author: "Vikram Malhotra",
        batch: "1973",
      },
      {
        text: "Money is one of a number of ingredients that help to make for a good life. When money becomes a scorecard, it can corrupt and compromise people's judgment. Money should be a byproduct — not a target. The target should be honest achievement. I was not someone who made getting the highest offer out of HBS a goal, and have maintained that perspective throughout. It's led to having enough money to never feel a need, but it also has forced some limits on how we live. We don't buy the most expensive car or house, and my wife worked to help pay for college educations. We have never felt the worse for it.",
        author: "Neha Gupta",
        batch: "1983",
      },
      {
        text: "Regrettably, financial wealth is a mark of success. My view of that unfortunate societal truth has not changed.",
        author: "Anonymous",
        batch: "1999",
      },
      {
        text: "Perhaps the most significant dimension of change with experience has been a shift in the meaning of 'worth' to me. As I look back, I recognize that many of my Harvard Business School associates have accumulated more material value in the last 50 years than I have. While I am grateful that I have been provided with sufficient funds to support my family, it has been in bringing pure water to indigenous Miskito Indians in Honduras, starting a literacy school for adults, participating with my wife in her founding of two teen courts for young people, and having a positive impact on our children and grandchildren that define my sense of wealth and worth.",
        author: "Rajiv Kapoor",
        batch: "2004",
      },
      {
        text: "Financial wealth is only one yardstick of success. There are many others — among the greatest are respect and admiration from one's peers and family, and few, if any, regrets about roads not taken or opportunities lost.",
        author: "Sneha Reddy",
        batch: "2014",
      },
      {
        text: "For some, financial wealth comes by chance — the lucky, sperm group with large financial inheritance, and even lottery winners. Others don't seriously pursue a path to wealth. They commit to service roles, such as teaching, preaching, and nursing, and don't do it for the money. They measure success in terms of the number of people they've helped or perhaps their ranking in their field. Still others choose careers in the military or civil service. So, while it's certainly true that many people regard financial wealth as a yardstick of success, I do not. My own opinions about money have changed little over the past half-century. When at the Harvard Business School, one of our professors asked us to write what we wanted out of our careers. I recall vividly that my response was to be successful enough financially to enjoy a good life, to provide my prospective family with financial security, and to have the time to enjoy my family and personal time. Certainly I've not ranked in the top of our class in terms of financial wealth, but I take great satisfaction from achieving my defined goals.",
        author: "Aditya Singh",
        batch: "1973",
      },
      {
        text: "Many years ago, my father told me, 'Never judge a man by the balance in his bank book, but by the quality of his life.' Financial wealth is a small measure in the yardstick of success. The major portion is what you have done with your life — what you have done to make a difference, large or small.",
        author: "Kavita Desai",
        batch: "1983",
      },
      {
        text: "I agree with my mother, who said that money provides a comfortable way of being unhappy. The nature of money and my view of money have changed over the last half-century. Money has become a dysfunctional belief system. The financial system is illogically back-to-front, inside out, and upside down.",
        author: "Rohan Mehta",
        batch: "1999",
      },
      {
        text: "I am glad to be financially secure, but I regard money as a means — not an end. I know a lot of people who have more money than I have, but I would not exchange places with them.",
        author: "Anonymous",
        batch: "2004",
      },
      {
        text: "I think we are all hopeful of adequate material success — but in the real world, there are those who are lucky enough to be in the right place at the right time and accomplish great wealth. This doesn't always equate to being the smartest or hardest worker. Over time, one must be comfortable with one's financial success and not judge it by the material wealth of another. There are so many other ways to measure a worthwhile and accomplished life.",
        author: "Divya Sharma",
        batch: "2014",
      },
      {
        text: "Beyond basic survival, wealth doesn't relate well to happiness.",
        author: "Amit Patel",
        batch: "1973",
      },
      {
        text: "Money is important to provide the lifestyle you seek, but being driven by money makes for a shallow life. Family and friends are far more important.",
        author: "Sanjay Verma",
        batch: "1983",
      },
      {
        text: "My belief about money evolved in my 40s (a dramatic change) to put fulfilling work ahead of the pursuit of money. Money is necessary to support you and your family's life needs. The very difficult questions are: What are needs versus wants? How much is enough for me? I still live with these questions.",
        author: "Meera Kapoor",
        batch: "1999",
      },
      {
        text: "As an entrepreneur, financial wealth is certainly a measure of success — but not the entire measure. In business, dollars are how we keep score. For me, it's a scorecard and not a driving factor.",
        author: "Vikram Singh",
        batch: "2004",
      },
      {
        text: "Any financial wealth is a by-product of doing your job well. Money is a scorecard — not the game itself.",
        author: "Anjali Gupta",
        batch: "2014",
      },
      {
        text: "In our society, it is difficult to not consider wealth as a yardstick of success. However, never consider wealth as your number one-measure of success. Achieving outstanding knowledge and performance should be your primary goal. If you achieve this, the wealth will come either financially or through respect and recognition by others.",
        author: "Ralph Linsalata",
        batch: "1963",
      },
      {
        text: "Too much money can make you just as unhappy as too little.",
        author: "Riya Malhotra",
        batch: "1973",
      },
      {
        text: "With regard to money, I've always wanted enough. 'Enough' has somehow managed to be there.",
        author: "Karan Sharma",
        batch: "1983",
      },
      {
        text: "In our society, it is difficult to not consider wealth as a yardstick of success. However, never consider wealth as your number one-measure of success. Achieving outstanding knowledge and performance should be your primary goal. If you achieve this, the wealth will come either financially or through respect and recognition by others.",
        author: "Priya Patel",
        batch: "1999",
      },
    ],
  },
  {
    chapter: "Leadership",
    advice: [
      {
        text: "Leadership, in my opinion, is getting others to do what you think should be done but have it be their idea.",
        author: "Anonymous",
        batch: "1963",
      },
      {
        text: "Outstanding leaders: Recognize opportunities and see trends before everyone else, Develop people at all levels, Clearly and passionately communicate the company's vision, goals, and core values, Live those core values every day and in everything they do, Continue to learn from and listen to others without regard for their level in the company, Accept the responsibility for all decisions — not just the successful ones, Maintain a positive can-do attitude, no matter how difficult the circumstances, but are honest in describing the situation, Focus on the priorities and do not get distracted by self-indulgences and needless low-priority items, Make all the people in the company feel that their roles are important to its success and that you appreciate their efforts",
        author: "Dhanuk Sachdev",
        batch: "1983",
      },
      {
        text: "I would have been a better leader if I had been less cocky in my early career and more confident in my middle career.",
        author: "Ayesha Sur",
        batch: "2014",
      },
      {
        text: "I could have been a better leader if I'd left line responsibilities earlier and spent more time thinking about strategy to compete successfully. A successful leader: Inspires by actions and words, Clearly communicates the goals of the organization to all, Is good at motivating and incentivizing people in the company, Sets forth a clear policy that no compromise in ethical behavior is acceptable",
        author: "Alisha Bansal",
        batch: "2004",
      },
      {
        text: "While the Harvard Business School was not a leadership course, it has been a source of inspiration and a valuable resource for everyone in business by teaching the value of preparation, the ability to think, and express ideas clearly and objectively. The Marine Corps, on the other hand, was on-the-job leadership training that forced the education of all its officers and trained them to accept the responsibility to lead a large number of others. What excited me about this experience was the necessity of getting things done through others, and gaining their trust and commitment to succeed in every mission we undertook together. All of us learned the power of a group of talented, well-trained individuals in attaining an objective where each one knew his role and executed it flawlessly. It's no different in the business world than in the military. Well-prepared, well-educated, well-motivated individuals perform well in every part of life.",
        author: "Aarav Sharma",
        batch: "1999",
      },
      {
        text: "Delegate more to trusted associates and don't try to do everything yourself. Business should be more of a partnership, rather than master and employee.",
        author: "Aditi Gupta",
        batch: "1983",
      },
      {
        text: "Leading by example is by far the most important characteristic of a good leader. Being decisive, firm but fair, and setting well defined goals for yourself and others are also very important.",
        author: "ERavi Patel",
        batch: "2014",
      },
      {
        text: "Every successful leader must articulate a clear vision in a way that everyone in the corporation understands. But that's just the start. Integrity and candor in dealing with your management team, employees, and investors, together with treating customers and your community fairly and with that same degree of integrity, is to me the real key to leadership. There is little need to take credit for success. It will flow naturally if it's really earned.",
        author: "Priya Kumar",
        batch: "1973",
      },
      {
        text: "Hire people better than you and give them support and the freedom to thrive.",
        author: "Kiran Reddy",
        batch: "1983",
      },
      {
        text: "The best leaders I've seen have been as or more knowledgeable than anyone else about the business and the environment in which it operates. They have a clear vision they can communicate to others, and they make decisions easily. On a personal level they are easy-going, don't take themselves too seriously, admit their mistakes, and are quick to give others credit. They have high standards, clearly articulated, to which they hold their people.",
        author: "Arjun Desai",
        batch: "1999",
      },
      {
        text: "A successful leader: Knows as much as he can about his organization's mission, Believes in the mission, Communicates the mission clearly, Points the way, Gets out of the way",
        author: "Meera Singh",
        batch: "2004",
      },
      {
        text: "A successful leader maintains an image at all times. People are following you, and you need to always be out in front for them.",
        author: "Sanjay Joshi",
        batch: "2014",
      },
      {
        text: "A good leader must manage the present in the context of the future, and keep both balls in the air. He needs to be a coach, a leader, an inspirer, and a taskmaster. He must respect his people. He has to trust and mistrust — trust but verify — at the same time (sort of a blend of several forms of managerial schizophrenia).",
        author: "Lakshmi Rao",
        batch: "1973",
      },
      {
        text: "Successful leaders seem to have several common characteristics. Most of all, they really know the business and the environment in which it exists. They are often good spokesmen (or women) and, most important, they seem to enable people and help them perform. Really good leaders are rare. A business can become successful if it focuses on delivering exceptional performance to clients.",
        author: "Vishal Nair",
        batch: "1983",
      },
      {
        text: "Personality characteristics do not define a leader. A leader must present a recognizable objective and explain why achieving the goal is important. No one wants to follow a person who does not know where he is going or is unable to explain why achieving the goal is important. Making a lot of money for the shareholders is not an inspiring goal — achieving excellence can be.",
        author: "Neha Agarwal",
        batch: "1999",
      },
      {
        text: "This question was asked the last day at the Harvard Business School 50 years ago, and I still have no other answer than 'Set an example.'",
        author: "Anonymous",
        batch: "1963",
      },
      {
        text: "Successful leaders come in all shapes and sizes. The main characteristic is getting the job done. Getting the most out of people is important. Be who you are and stand by your principles.",
        author: "Anonymous",
        batch: "1963",
      },
      {
        text: "A successful leader must be a champion delegator. I wish I had spent more time mastering this all-important skill.",
        author: "Rohit Mehta",
        batch: "1999",
      },
      {
        text: "I personally believe that a certain amount of circumspection and even some humility are wonderful traits in a successful leader.",
        author: "Shalini Verma",
        batch: "2014",
      },
      {
        text: "I believe the essential characteristics of leadership blend specific knowledge and analytical skill, genuine communication, a willingness to consider possibilities, and the courage to decide and act. In both my major corporate experiences and almost two decades of small business ownership, I too often failed to acknowledge the 90% positive level of employee performance, mentioning instead the 10% we might have done better. The need to affirm and genuinely express both achievement and opportunity for improvement among employees was certainly well taught in Harvard Business School classes. A better adherence to those lessons would have made me a better leader.",
        author: "Rajesh Iyer",
        batch: "1973",
      },
      {
        text: "Be a listener — listen more than you talk. Think before you act. Be strategic rather than tactical. Never lose sight of the importance of continuously strengthening your organization.",
        author: "Rani Kapoor",
        batch: "1973",
      },
      {
        text: "To be a good leader: Set the example, Work to obtain total buy-in to the vision, Communicate often — both the good and bad news, Celebrate success, Treat others as you wish to be treated, Hire the best people you can find and let them run",
        author: "Amit Bhatia",
        batch: "1999",
      },
      {
        text: "The successful leaders I saw were genuine people with excellent communication skills, strategic vision, and the ability to motivate others. They were thoughtful and a good source of talent. They also had an egalitarian leadership style, a positive attitude and high energy.",
        author: "Sita Saini",
        batch: "2004",
      },
      {
        text: "I learned this at the Harvard Business School: Listen, learn, lead. I learned this through experience: Give credit, honest feedback, and professional enrichment. Set high standards and get rid of those who do not measure up, so you lead an elite corps who take pride in their work. To be a better leader, I could have developed greater ego and personal charisma.",
        author: "Sumit Malhotra",
        batch: "2014",
      },
      {
        text: "Successful leaders know how to balance focus, discipline, and understanding in dealing with strategies and with people. They need to be good anticipators and thoroughly understand their team and its strengths and weaknesses. They need to be perseverant but not stubborn. Maybe most important, they need to know how to gain from a loss. My biggest failures as a leader were probably being to be too averse to controversy, too unwilling to take the harder short-term road to reap the greater long-term success, and leaving failing subordinates in place too long.",
        author: "Kavita Chauhan",
        batch: "1973",
      },
      {
        text: "Qualities of a good leader: Sharing a vision and passion for success, being a good listener, and accepting and acting on the considered advice of others. But most important, finding and developing a team of people who can carry out my role better than I could myself.",
        author: "Pradeep Yadav",
        batch: "1983",
      },
      {
        text: "Successful leaders care about those they lead and show it with their praise, faith in others, and sharing monetary success.",
        author: "Anonymous",
        batch: "1963",
      },
      {
        text: "A leader must have a charismatic energy that empowers him or her to convince others to follow a particular vision. This includes having excellent communication skills and a warmth of personality that makes people want to please the leader and fulfill his or her expectations.",
        author: "Deepika Joshi",
        batch: "1999",
      },
      {
        text: "Leadership depends greatly on one's personality. It requires the ability to get others to participate. Not everyone can do this. I prefer to work 'behind the scenes' in getting things done — analyzing all the components of a project and seeing that they're all dealt with, even if I have to do them.",
        author: "Suraj Thakur ",
        batch: "2004",
      },
      {
        text: "Listen. Be a good role model. Do your homework. Delegate. Praise others' efforts.",
        author: "Harish Mishra",
        batch: "2014",
      },
      {
        text: "Fairness, Openness, Impatience, Energy. To be a better leader, I'd have had more of the above — especially impatience.",
        author: "Pooja Dubey",
        batch: "1973",
      },
      {
        text: "A successful leader has an entrepreneurial spirit. The power of an entrepreneurial company owned by its employees with total freedom of information is a phenomenal, competitive engine.",
        author: "Kunal Pillai",
        batch: "1983",
      },
    ],
  },
  {
    chapter: "Growing Older",
    advice: [
      {
        text: "Don't retire if you can avoid it. I stopped getting paid by someone else to work 12 years ago, but fortunately I joined a group who started a private investing firm together, after retiring from their former careers. It has kept us young and engaged, and that may be one of the keys to good health.",
        author: "Anjali Raghavan",
        batch: "1999",
      },
      {
        text: "Life is a series of restructuring situations. Planning and dealing with the retirement series is no different, so restructure your life continuously and never really retire.",
        author: "Anonymous",
        batch: "1963",
      },
      {
        text: "Walk every day. Lower your sugar and carb intake. Stay engaged. Keep 'working.' Balance everything. Reach out to family and friends.",
        author: "Nikhil Sharma",
        batch: "2004",
      },
      {
        text: "Maintain a healthy attitude about the hand you are dealt in life. Be flexible and cheerful, and do what your doctor says — after you find a good one!",
        author: "Neeraj Bhatt",
        batch: "2014",
      },
      {
        text: "Never retire — it keeps you younger and healthier.",
        author: "Seema Joshi",
        batch: "1973",
      },
    ],
  },
  {
    chapter: "Charity & Spirituality",
    advice: [
      {
        text: "I believe that each person must define an optimal amount of financial success. This is the point at which money is no longer a great motivator. Once our economic needs have been fulfilled, it is time to give back — to seek out those whose basic needs have not been met, whose human rights to shelter, food, and safety have not been satisfied.",
        author: "Tarun Khanna",
        batch: "1983",
      },
      {
        text: "I think the most important idea of success is the contribution you make to others, and this cannot be quantified. What you give is much more important than what you get. Following your values will lead to a much 'richer' life.",
        author: "Divya Reddy",
        batch: "1999",
      },
      {
        text: "The real test is how well you are respected by your family, colleagues, employees, and friends. That respect is earned by your actions over long periods of time — not your balance sheet.",
        author: "Vikas Gupta",
        batch: "2004",
      },
      {
        text: "I was born in 1932 and grew up during the Depression. In the beginning, poverty was the level to which I aspired. When I reached it, my next goal was to get out of debt. That took several years. Then my goal was to become financially independent. After reaching independence, more money was not a great motivator for me. My interest became trying to make a difference — making the company I worked for successful, and working for my church and other volunteer organizations.",
        author: "Asha Verma",
        batch: "2014",
      },
      {
        text: "Perhaps the most significant dimension of change with experience has been a shift in the meaning of 'worth' to me. As I look back, I recognize that many of my Harvard Business School associates have accumulated more material value in the last 50 years than I have. While I am grateful that I have been provided with sufficient funds to support my family, it has been in bringing pure water to indigenous Miskito Indians in Honduras, starting a literacy school for adults, participating with my wife in her founding of two teen courts for young people, and having a positive impact on our children and grandchildren that define my sense of wealth and worth.",
        author: "Vikram Kumar",
        batch: "1973",
      },
      {
        text: "Many years ago, my father told me, 'Never judge a man by the balance in his bank book, but by the quality of his life.' Financial wealth is a small measure in the yardstick of success. The major portion is what you have done with your life — what you have done to make a difference, large or small.",
        author: "Sheetal Pandey",
        batch: "1983",
      },
      {
        text: "I am glad to be financially secure, but I regard money as a means — not an end. I know a lot of people who have more money than I have, but I would not exchange places with them.",
        author: "Anonymous",
        batch: "1973",
      },
      {
        text: "I think we are all hopeful of adequate material success — but in the real world, there are those who are lucky enough to be in the right place at the right time and accomplish great wealth. This doesn't always equate to being the smartest or hardest worker. Over time, one must be comfortable with one's financial success and not judge it by the material wealth of another. There are so many other ways to measure a worthwhile and accomplished life.",
        author: "Akash Rajput",
        batch: "1999",
      },
      {
        text: "Money is important to provide the lifestyle you seek, but being driven by money makes for a shallow life. Family and friends are far more important.",
        author: "Rekha Deshmukh",
        batch: "2004",
      },
      {
        text: "My belief about money evolved in my 40s (a dramatic change) to put fulfilling work ahead of the pursuit of money. Money is necessary to support you and your family's life needs. The very difficult questions are: What are needs versus wants? How much is enough for me? I still live with these questions.",
        author: "Rohit Bansal",
        batch: "2014",
      },
      {
        text: "Any financial wealth is a by-product of doing your job well. Money is a scorecard — not the game itself.",
        author: "Manisha Choudhary",
        batch: "1973",
      },
      {
        text: "With regard to money, I've always wanted enough. 'Enough' has somehow managed to be there.",
        author: "Pradeep Kapoor",
        batch: "1983",
      },
      {
        text: "In our society, it is difficult to not consider wealth as a yardstick of success. However, never consider wealth as your number one-measure of success. Achieving outstanding knowledge and performance should be your primary goal. If you achieve this, the wealth will come either financially or through respect and recognition by others.",
        author: "Anil Bhardwaj",
        batch: "1999",
      },
    ],
  },
  {
    chapter: "Happiness & Success",
    advice: [
      {
        text: "Stay curious. The best innovations come from asking 'what if?'",
        author: "Tanya Agarwal",
        batch: "2004",
      },
      {
        text: "Money ... cannot buy happiness or respect. I know many people who are living happy, satisfied lives on very little money. On the other hand, I have been poor and I have been rich, and it is a lot easier to be rich.",
        author: "Harish Kumar",
        batch: "2004",
      },
      {
        text: "Money to me is freedom. That is all I want of it. I don't view it as a yardstick and do not measure myself or others by it. My greatest admiration is for non-financial accomplishment.",
        author: "TNidhi Patel",
        batch: "1973",
      },
      {
        text: "When we graduated from the Harvard Business School, the priorities were Money, Power and Position. I had misgivings about this, and remember writing on the blackboard these words by William Wordsworth: 'Getting and spending, we lay waste our powers.' I think the most important idea of success is the contribution you make to others, and this cannot be quantified. What you give is much more important than what you get. Following your values will lead to a much 'richer' life.",
        author: "Vijay Bhagat",
        batch: "2014",
      },
      {
        text: "You need to accumulate enough wealth to provide a good life for your family, educate your children, support worthwhile causes, amply provide for your retirement years, and leave something for your heirs. But that's not the litmus test for success. The real test is how well you are respected by your family, colleagues, employees, and friends. That respect is earned by your actions over long periods of time — not your balance sheet.",
        author: "Abhishek Mehta",
        batch: "2004",
      },
      {
        text: "Financial wealth is a good measure of business success. But life is more than your career. To be truly successful, you need to build a good marriage, a good career, a good family, maintain good health, and have a sense of purpose to your life beyond both career and family.",
        author: "Swati Nair",
        batch: "1983",
      },
      {
        text: "I do not agree, although I did until I had worked many years. Find work that you love, as long as you can earn enough to provide for your family and a reasonably comfortable retirement. Those who persist in believing wealth brings happiness are to be pitied.",
        author: "Shweta Verma",
        batch: "1973",
      },
      {
        text: "Happiness should be the yardstick of success.",
        author: "Ramesh Iyer",
        batch: "1973",
      },
      {
        text: "Wealth is absolutely an important yardstick, but not the only one. The really successful people are those who love their work, make money from it, and manage to keep close friends.",
        author: "Payal Desai",
        batch: "2014",
      },
      {
        text: "Money is not a sustainable driver of happiness or success — period. Family is.",
        author: "Anonymous",
        batch: "1963",
      },
      {
        text: "Money is one of a number of ingredients that help to make for a good life. When money becomes a scorecard, it can corrupt and compromise people's judgment. Money should be a byproduct — not a target. The target should be honest achievement. I was not someone who made getting the highest offer out of HBS a goal, and have maintained that perspective throughout. It's led to having enough money to never feel a need, but it also has forced some limits on how we live. We don't buy the most expensive car or house, and my wife worked to help pay for college educations. We have never felt the worse for it.",
        author: "Manish Kapoor",
        batch: "1983",
      },
      {
        text: "Financial wealth is only one yardstick of success. There are many others — among the greatest are respect and admiration from one's peers and family, and few, if any, regrets about roads not taken or opportunities lost.",
        author: "Priyanka Reddy",
        batch: "1999",
      },
      {
        text: "Beyond basic survival, wealth doesn't relate well to happiness.",
        author: "Aniket Joshi",
        batch: "2004",
      },
      {
        text: "Money is important to provide the lifestyle you seek, but being driven by money makes for a shallow life. Family and friends are far more important.",
        author: "Laxmi Soni",
        batch: "2004",
      },
      {
        text: "My belief about money evolved in my 40s (a dramatic change) to put fulfilling work ahead of the pursuit of money. Money is necessary to support you and your family's life needs. The very difficult questions are: What are needs versus wants? How much is enough for me? I still live with these questions.",
        author: "Vishal Yadav",
        batch: "1983",
      },
      {
        text: "As an entrepreneur, financial wealth is certainly a measure of success — but not the entire measure. In business, dollars are how we keep score. For me, it's a scorecard and not a driving factor.",
        author: "Shubham Agarwal",
        batch: "1999",
      },
      {
        text: "Any financial wealth is a by-product of doing your job well. Money is a scorecard — not the game itself.",
        author: "JNeeta Bansal",
        batch: "1999",
      },
      {
        text: "Too much money can make you just as unhappy as too little.",
        author: "Raghav Reddy",
        batch: "2004",
      },
      {
        text: "With regard to money, I've always wanted enough. 'Enough' has somehow managed to be there.",
        author: "Rekha Gupta",
        batch: "1973",
      },
      {
        text: "In our society, it is difficult to not consider wealth as a yardstick of success. However, never consider wealth as your number one-measure of success. Achieving outstanding knowledge and performance should be your primary goal. If you achieve this, the wealth will come either financially or through respect and recognition by others.",
        author: "Mukesh Chauhan",
        batch: "2004",
      },
      {
        text: "Too much money can make you just as unhappy as too little.",
        author: "Rajeev Kapoor",
        batch: "2004",
      },
      {
        text: "With regard to money, I've always wanted enough. 'Enough' has somehow managed to be there.",
        author: "Shruti Sharma",
        batch: "2004",
      },
      {
        text: "In our society, it is difficult to not consider wealth as a yardstick of success. However, never consider wealth as your number one-measure of success. Achieving outstanding knowledge and performance should be your primary goal. If you achieve this, the wealth will come either financially or through respect and recognition by others.",
        author: "Priya Patel",
        batch: "1999",
      },
    ],
  },
  {
    chapter: "Turning Points",
    advice: [
      {
        text: "Stay curious. The best innovations come from asking 'what if?'",
        author: "Sanjeev Mehta",
        batch: "2004",
      },
      {
        text: "I was born in 1932 and grew up during the Depression. In the beginning, poverty was the level to which I aspired. When I reached it, my next goal was to get out of debt. That took several years. Then my goal was to become financially independent. After reaching independence, more money was not a great motivator for me. My interest became trying to make a difference — making the company I worked for successful, and working for my church and other volunteer organizations.",
        author: "Priyanka Deshmukh",
        batch: "2004",
      },
      {
        text: "My belief about money evolved in my 40s (a dramatic change) to put fulfilling work ahead of the pursuit of money. Money is necessary to support you and your family's life needs. The very difficult questions are: What are needs versus wants? How much is enough for me? I still live with these questions.",
        author: "Rishi Joshi",
        batch: "1999",
      },
      {
        text: "Perhaps the most significant dimension of change with experience has been a shift in the meaning of 'worth' to me. As I look back, I recognize that many of my Harvard Business School associates have accumulated more material value in the last 50 years than I have. While I am grateful that I have been provided with sufficient funds to support my family, it has been in bringing pure water to indigenous Miskito Indians in Honduras, starting a literacy school for adults, participating with my wife in her founding of two teen courts for young people, and having a positive impact on our children and grandchildren that define my sense of wealth and worth.",
        author: "Krishnan Kumar",
        batch: "1999",
      },
      {
        text: "When we graduated from the Harvard Business School, the priorities were Money, Power and Position. I had misgivings about this, and remember writing on the blackboard these words by William Wordsworth: 'Getting and spending, we lay waste our powers.' I think the most important idea of success is the contribution you make to others, and this cannot be quantified. What you give is much more important than what you get. Following your values will lead to a much 'richer' life.",
        author: "Pooja Bhatt",
        batch: "1999",
      },
      {
        text: "I do not agree, although I did until I had worked many years. Find work that you love, as long as you can earn enough to provide for your family and a reasonably comfortable retirement. Those who persist in believing wealth brings happiness are to be pitied.",
        author: "Sunil Singh",
        batch: "2014",
      },
      {
        text: "Money is one of a number of ingredients that help to make for a good life. When money becomes a scorecard, it can corrupt and compromise people's judgment. Money should be a byproduct — not a target. The target should be honest achievement. I was not someone who made getting the highest offer out of HBS a goal, and have maintained that perspective throughout. It's led to having enough money to never feel a need, but it also has forced some limits on how we live. We don't buy the most expensive car or house, and my wife worked to help pay for college educations. We have never felt the worse for it.",
        author: "Neelam Reddy",
        batch: "1983",
      },
      {
        text: "In our society, it is difficult to not consider wealth as a yardstick of success. However, never consider wealth as your number one-measure of success. Achieving outstanding knowledge and performance should be your primary goal. If you achieve this, the wealth will come either financially or through respect and recognition by others.",
        author: "Rajeev Iyer",
        batch: "1963",
      },
    ],
  },
  {
    chapter: "Life's Lessons",
    advice: [
      {
        text: "Money ... cannot buy happiness or respect. I know many people who are living happy, satisfied lives on very little money. On the other hand, I have been poor and I have been rich, and it is a lot easier to be rich.",
        author: "Tanvi Patil",
        batch: "1999",
      },
      {
        text: "Money to me is freedom. That is all I want of it. I don't view it as a yardstick and do not measure myself or others by it. My greatest admiration is for non-financial accomplishment.",
        author: "Subodh Sharma",
        batch: "2004",
      },
      {
        text: "Spend moderately, invest substantially, and be moderate in 'helping' your kids. Do not give them a lot. You'll mean well, but will be doing them harm.",
        author: "Shankar Bhat",
        batch: "2004",
      },
      {
        text: "When we graduated from the Harvard Business School, the priorities were Money, Power and Position. I had misgivings about this, and remember writing on the blackboard these words by William Wordsworth: 'Getting and spending, we lay waste our powers.' I think the most important idea of success is the contribution you make to others, and this cannot be quantified. What you give is much more important than what you get. Following your values will lead to a much 'richer' life.",
        author: "Rina Chauhan",
        batch: "2014",
      },
      {
        text: "You need to accumulate enough wealth to provide a good life for your family, educate your children, support worthwhile causes, amply provide for your retirement years, and leave something for your heirs. But that's not the litmus test for success. The real test is how well you are respected by your family, colleagues, employees, and friends. That respect is earned by your actions over long periods of time — not your balance sheet.",
        author: "Manish Mehta",
        batch: "2014",
      },
      {
        text: "Financial wealth is a good measure of business success. But life is more than your career. To be truly successful, you need to build a good marriage, a good career, a good family, maintain good health, and have a sense of purpose to your life beyond both career and family.",
        author: "Ankit Kumar",
        batch: "1973",
      },
      {
        text: "On inheriting: We have decided that a little inheritance is fine — a lot is a burden. Our kids all had a great education and the opportunity to go as far as they wanted to go, fully paid for, no debts. We consider that to be the greatest gift parents can give to their offspring.",
        author: "Aarti Agarwal",
        batch: "1983",
      },
      {
        text: "Is financial wealth a yardstick of success? Absolutely not! Mother Teresa, Albert Schweitzer, Gandhi, Churchill — not much money there. Money is no longer the sine qua non it once was. I now appreciate that it can be used to make a better life on this planet for many who inhabit it. But I still like money. I still like counting it.",
        author: "Anonymous",
        batch: "1963",
      },
      {
        text: "I was born in 1932 and grew up during the Depression. In the beginning, poverty was the level to which I aspired. When I reached it, my next goal was to get out of debt. That took several years. Then my goal was to become financially independent. After reaching independence, more money was not a great motivator for me. My interest became trying to make a difference — making the company I worked for successful, and working for my church and other volunteer organizations.",
        author: "Arjun Mehta",
        batch: "1973",
      },
      {
        text: "I do not agree, although I did until I had worked many years. Find work that you love, as long as you can earn enough to provide for your family and a reasonably comfortable retirement. Those who persist in believing wealth brings happiness are to be pitied.",
        author: "Priya Sharma",
        batch: "1983",
      },
      {
        text: "Happiness should be the yardstick of success.",
        author: "Rahul Verma",
        batch: "1999",
      },
      {
        text: "Wealth is absolutely an important yardstick, but not the only one. The really successful people are those who love their work, make money from it, and manage to keep close friends.",
        author: "Ananya Patel",
        batch: "2004",
      },
      {
        text: "Money is not a sustainable driver of happiness or success — period. Family is.",
        author: "Anonymous",
        batch: "2014",
      },
      {
        text: "I do largely agree that financial wealth is a yardstick of success. However, I would add that in judging the degree of someone's financial success, it is extremely important to know where one started. At the Harvard Business School, many if not most graduates started from a high base. Moreover, it is important to know how one handled his or her financial success and how much he or she gave back to society.",
        author: "Vikram Malhotra",
        batch: "1973",
      },
      {
        text: "Money is one of a number of ingredients that help to make for a good life. When money becomes a scorecard, it can corrupt and compromise people's judgment. Money should be a byproduct — not a target. The target should be honest achievement. I was not someone who made getting the highest offer out of HBS a goal, and have maintained that perspective throughout. It's led to having enough money to never feel a need, but it also has forced some limits on how we live. We don't buy the most expensive car or house, and my wife worked to help pay for college educations. We have never felt the worse for it.",
        author: "Neha Gupta",
        batch: "1983",
      },
      {
        text: "Regrettably, financial wealth is a mark of success. My view of that unfortunate societal truth has not changed.",
        author: "Anonymous",
        batch: "1999",
      },
      {
        text: "Perhaps the most significant dimension of change with experience has been a shift in the meaning of 'worth' to me. As I look back, I recognize that many of my Harvard Business School associates have accumulated more material value in the last 50 years than I have. While I am grateful that I have been provided with sufficient funds to support my family, it has been in bringing pure water to indigenous Miskito Indians in Honduras, starting a literacy school for adults, participating with my wife in her founding of two teen courts for young people, and having a positive impact on our children and grandchildren that define my sense of wealth and worth.",
        author: "Rajiv Kapoor",
        batch: "2004",
      },
      {
        text: "Financial wealth is only one yardstick of success. There are many others — among the greatest are respect and admiration from one's peers and family, and few, if any, regrets about roads not taken or opportunities lost.",
        author: "Sneha Reddy",
        batch: "2014",
      },
      {
        text: "For some, financial wealth comes by chance — the lucky, sperm group with large financial inheritance, and even lottery winners. Others don't seriously pursue a path to wealth. They commit to service roles, such as teaching, preaching, and nursing, and don't do it for the money. They measure success in terms of the number of people they've helped or perhaps their ranking in their field. Still others choose careers in the military or civil service. So, while it's certainly true that many people regard financial wealth as a yardstick of success, I do not. My own opinions about money have changed little over the past half-century. When at the Harvard Business School, one of our professors asked us to write what we wanted out of our careers. I recall vividly that my response was to be successful enough financially to enjoy a good life, to provide my prospective family with financial security, and to have the time to enjoy my family and personal time. Certainly I've not ranked in the top of our class in terms of financial wealth, but I take great satisfaction from achieving my defined goals.",
        author: "Aditya Singh",
        batch: "1973",
      },
      {
        text: "Many years ago, my father told me, 'Never judge a man by the balance in his bank book, but by the quality of his life.' Financial wealth is a small measure in the yardstick of success. The major portion is what you have done with your life — what you have done to make a difference, large or small.",
        author: "Kavita Desai",
        batch: "1983",
      },
      {
        text: "I agree with my mother, who said that money provides a comfortable way of being unhappy. The nature of money and my view of money have changed over the last half-century. Money has become a dysfunctional belief system. The financial system is illogically back-to-front, inside out, and upside down.",
        author: "Rohan Mehta",
        batch: "1999",
      },
      {
        text: "I am glad to be financially secure, but I regard money as a means — not an end. I know a lot of people who have more money than I have, but I would not exchange places with them.",
        author: "Anonymous",
        batch: "2004",
      },
      {
        text: "I think we are all hopeful of adequate material success — but in the real world, there are those who are lucky enough to be in the right place at the right time and accomplish great wealth. This doesn't always equate to being the smartest or hardest worker. Over time, one must be comfortable with one's financial success and not judge it by the material wealth of another. There are so many other ways to measure a worthwhile and accomplished life.",
        author: "Divya Sharma",
        batch: "2014",
      },
      {
        text: "Beyond basic survival, wealth doesn't relate well to happiness.",
        author: "Amit Patel",
        batch: "1973",
      },
      {
        text: "Money is important to provide the lifestyle you seek, but being driven by money makes for a shallow life. Family and friends are far more important.",
        author: "Sanjay Verma",
        batch: "1983",
      },
      {
        text: "My belief about money evolved in my 40s (a dramatic change) to put fulfilling work ahead of the pursuit of money. Money is necessary to support you and your family's life needs. The very difficult questions are: What are needs versus wants? How much is enough for me? I still live with these questions.",
        author: "Meera Kapoor",
        batch: "1999",
      },
      {
        text: "As an entrepreneur, financial wealth is certainly a measure of success — but not the entire measure. In business, dollars are how we keep score. For me, it's a scorecard and not a driving factor.",
        author: "Vikram Singh",
        batch: "2004",
      },
      {
        text: "Any financial wealth is a by-product of doing your job well. Money is a scorecard — not the game itself.",
        author: "Anjali Gupta",
        batch: "2014",
      },
      {
        text: "In our society, it is difficult to not consider wealth as a yardstick of success. However, never consider wealth as your number one-measure of success. Achieving outstanding knowledge and performance should be your primary goal. If you achieve this, the wealth will come either financially or through respect and recognition by others.",
        author: "Rajesh Nair",
        batch: "2004",
      },
      {
        text: "Too much money can make you just as unhappy as too little.",
        author: "Riya Malhotra",
        batch: "1973",
      },
      {
        text: "With regard to money, I've always wanted enough. 'Enough' has somehow managed to be there.",
        author: "Karan Sharma",
        batch: "1983",
      },
      {
        text: "In our society, it is difficult to not consider wealth as a yardstick of success. However, never consider wealth as your number one-measure of success. Achieving outstanding knowledge and performance should be your primary goal. If you achieve this, the wealth will come either financially or through respect and recognition by others.",
        author: "Priya Patel",
        batch: "1999",
      },
    ],
  },
];

const IfIKnewThen = () => {
  const [activeChapter, setActiveChapter] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const chapterRef = useRef(null);
  const controls = useAnimation();

  // Animate when component mounts
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Toggle description visibility
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="contact-page-container">
      {/* Hero section with contact information */}
      <section className="contact-hero">
        <motion.div
          className="hero-content"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
          >
            If I Knew Then
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
          >
            Advice for life - from the voices of IIT Bombay's alumni
          </motion.p>

          <motion.div
            className="description-container"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
          >
            <p className="hero-subtitle" style={{ textAlign: "justify" }}>
              As batches of IIT Bombay alumni return to campus during the
              reunions, reconnecting with old friends, walking familiar
              corridors, and reflecting on the years gone by, we asked a simple
              question:
              <br />
              <br />
              <em>
                "If you could go back and share one piece of advice with your
                younger self, what would it be?"
              </em>
            </p>

            <AnimatePresence>
              {showFullDescription && (
                <motion.p
                  className="hero-subtitle description-full"
                  style={{ textAlign: "justify" }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  The answers, as you might expect from this remarkable and
                  diverse group, were honest, heartfelt, and rich with
                  perspective. From the earliest batches to more recent ones,
                  our alumni have lived through extraordinary times- times of
                  dramatic transformation in technology, society, culture, and
                  the very meaning of work and success.
                  <br />
                  <br />
                  And through all the change, some things remained constant. The
                  big questions- about love, purpose, career choices, family,
                  health, success, failure, and finding balance- never really
                  went away. They only grew deeper.
                  <br />
                  <br />
                  This initiative of SARC, If I Knew Then, is an attempt to
                  capture those reflections, not as definitive answers, but as
                  guidance from those who've walked farther down the path. Their
                  journeys haven't been perfect, nor always easy. But that's
                  precisely why their stories resonate. Because they're real.
                  <br />
                  <br />
                  Whether you're a student wondering about your first job, an
                  alumnus in mid-career, or someone simply curious about life's
                  turning points, we hope these words offer you perspective,
                  comfort, challenge, and perhaps, a quiet sense of connection.
                  <br />
                  <br />
                  Because no matter when you graduated, we all share one thing:
                  The desire to make sense of the journey- and to help those who
                  come after.
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              className="toggle-description-btn"
              onClick={toggleDescription}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showFullDescription ? (
                <>
                  Show Less <FaChevronUp />
                </>
              ) : (
                <>
                  Read More <FaChevronDown />
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Chapter Sections */}
      <section className="chapters-section" ref={chapterRef}>
        <div className="section-heading">
          <h2>Chapters</h2>
          <div className="heading-line"></div>
        </div>

        <div className="chapter-navigation">
          {adviceData.map((chapter, index) => (
            <motion.button
              key={chapter.chapter}
              className={`chapter-nav-item ${
                activeChapter === chapter.chapter ? "active" : ""
              }`}
              onClick={() => setActiveChapter(chapter.chapter)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {chapter.chapter}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeChapter ? (
            <motion.div
              key={activeChapter}
              className="advice-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {adviceData
                .find((p) => p.chapter === activeChapter)
                ?.advice.map((item, index) => (
                  <motion.div
                    key={`${item.author}-${index}`}
                    className="advice-item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <div className="advice-quote">
                      <FaQuoteLeft className="quote-icon quote-left" />
                      <p className="advice-text">{item.text}</p>
                      <FaQuoteRight className="quote-icon quote-right" />
                    </div>
                    <div className="advice-author">
                      <h3>{item.author}</h3>
                      <p>Batch of {item.batch}</p>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          ) : (
            <motion.div
              className="chapter-prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p>Select a chapter above to see alumni advice</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Modal for detailed member view */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="member-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              className="member-modal"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setSelectedMember(null)}
                aria-label="Close"
              >
                ×
              </button>

              <div className="modal-content">
                <div className="modal-details">
                  <h2>{selectedMember.name}</h2>
                  <p className="modal-title">{activeChapter}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="contact-footer">
        <p>
          © {new Date().getFullYear()} Student Alumni Relations Cell (SARC), IIT
          Bombay
        </p>
      </footer>
    </div>
  );
};

export default IfIKnewThen;
