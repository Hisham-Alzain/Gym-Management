import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';

class CustomVideoPlayer extends StatelessWidget {
  final VideoPlayerController videoPlayerController;
  const CustomVideoPlayer({super.key, required this.videoPlayerController});

  @override
  Widget build(BuildContext context) {
    return VideoPlayer(videoPlayerController);
  }
}

class CustomPlayableVideoPlayer extends StatefulWidget {
  final VideoPlayerController videoPlayerController;
  const CustomPlayableVideoPlayer({
    super.key,
    required this.videoPlayerController,
  });

  @override
  State<CustomPlayableVideoPlayer> createState() =>
      _CustomPlayableVideoPlayerState();
}

class _CustomPlayableVideoPlayerState extends State<CustomPlayableVideoPlayer> {
  @override
  Widget build(BuildContext context) {
    return widget.videoPlayerController.value.isInitialized
        ? Stack(
            children: [
              VideoPlayer(widget.videoPlayerController),
              Center(
                child: IconButton(
                  onPressed: () {
                    setState(() {
                      widget.videoPlayerController.value.isPlaying
                          ? widget.videoPlayerController.pause()
                          : widget.videoPlayerController.play();
                    });
                  },
                  icon: Icon(
                    widget.videoPlayerController.value.isPlaying
                        ? Icons.pause
                        : Icons.play_arrow,
                    size: 100,
                    color: Colors.white70,
                  ),
                ),
              ),
            ],
          )
        : const Center(
            child: Icon(
              Icons.videocam_off_sharp,
              size: 75,
            ),
          );
  }
}
