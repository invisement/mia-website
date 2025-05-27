{pkgs}: {
  channel = "stable-24.11";
  packages = [
    pkgs.deno
  ];
  # idx.previews = {
  #   previews = {
  #     web = {
  #       command = [
  #         "deno"
  #         "task"
  #         "dev"
  #       ];
  #       manager = "web";
  #     };
  #   };
  # };
}