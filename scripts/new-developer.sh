echo "Let's get started installing dependencies..."

echo "Do you want to enable auto-signing your commits?"
echo "Note: Will use key id_ed25519"
echo "Note: Remember to upload your key as a signing key"
select yn in "Yes" "No"; do
    case $yn in
        Yes ) { 
        	git config --global gpg.format ssh;
        	git config --global user.signingkey "~/.ssh/id_ed25519.pub";
        	git config --global commit.gpgsign true;
        	}
        	break;;
        No ) break;;
    esac
done

# https://commitizen-tools.github.io/commitizen/
echo "Do you want to install Commitizen?"
select yn in "Yes" "No"; do
    case $yn in
        Yes ) brew install commitizen; break;;
        No ) break;;
    esac
done


# https://pre-commit.com/
echo "Do you want to install pre-commit?"
select yn in "Yes" "No"; do
    case $yn in
        Yes ) brew install pre-commit; break;;
        No ) break;;
    esac
done


echo "Do you want to configure pre-commit?"
select yn in "Yes" "No"; do
    case $yn in
        Yes ) pre-commit install --hook-type commit-msg --hook-type pre-push; pre-commit autoupdate; break;;
        No ) break;;
    esac
done