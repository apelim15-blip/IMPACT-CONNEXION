import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TournamentBracket from "@/components/tournament/TournamentBracket";

const TournamentPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <TournamentBracket />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TournamentPage;
